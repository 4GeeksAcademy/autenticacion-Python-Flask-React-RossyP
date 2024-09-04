"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
# from main import bcrypt
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

bcrypt = Bcrypt()
jwt = JWTManager()

# Allow CORS requests to this API
# CORS(api)
CORS(api, origins=["https://turbo-couscous-9vq57r7r9wxcp4x7-3000.app.github.dev"])


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    try:
        current_user_id = get_jwt_identity()
        if current_user_id:
            query_results = User.query.all()
            results = list(map(lambda user: user.serialize(), query_results))

            response_body = { 
                "msg" : "Estas trayendo la lista de usuarios",
                "results" : results
            }

            return jsonify(response_body), 200
        else:
            return jsonify({"msg": "Token invalido"}), 401
    
    except Exception as e:
        return jsonify({"error": "Internal error" + str(e)}), 500


@api.route("/register", methods=["POST"])
def register():
    try:
        name = request.json.get("name")
        email = request.json.get("email")
        password = request.json.get("password")

        print(name)
        print(email)
        print(password)

        if not name or not email or not password:
            return jsonify({"msg":"Necesitan llenar todos los campos"}), 404
        
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"msg": f"El email {email}, que intentas registrar ya existe."}), 400
        
        password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        print(password_hash)
        new_user = User(name=name, email=email, password=password_hash)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "Usuario registrado con exito."}), 200
    
    except Exception as e:
        return jsonify({"error": "Internal error: " + str(e)}), 500
    
@api.route("/login", methods=["POST"])
def get_token():
    try:
        email = request.json.get("email")
        password = request.json.get("password")

        if not email or not password:
            return jsonify({"msg":"Se requiere el email y el password"}), 400

        login_user = User.query.filter_by(email=email).one()

        if not login_user:
            return jsonify({"msg": "El email ingresado no existe, registrate"}), 404
        
        password_from_db = login_user.password
        true_or_false = bcrypt.check_password_hash(password_from_db, password)

        if true_or_false:
            login_user_id = login_user.id
            access_token = create_access_token(identity=login_user_id)
            return jsonify({"access_token":access_token, "name":login_user.name, "email":login_user.email}), 200
        else:
            return jsonify({"msg": "Contraseña incorrecta"}), 404
    
    except Exception as e:
        return jsonify({"error": "internal error "+ str(e)}), 500