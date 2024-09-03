"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
# from main import bcrypt
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

bcrypt = Bcrypt()
jwt = JWTManager()

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/users", methods=["GET"])
def get_users():
    try:
        query_results = User.query.all()
        results = list(map(lambda user: user.serialize(), query_results))

        response_body = { 
            "msg" : "Estas trayendo la lista de usuarios",
            "results" : results
        }

        return jsonify(response_body), 200
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

        new_user = User(name=name, email=email, password=password_hash)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "Usuario registrado con exito."}), 200
    
    except Exception as e:
        return jsonify({"error": "Internal error: " + str(e)}), 500