

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			dataUsers: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			getUsers: async () => {
				let get_token = localStorage.getItem("token")
				if (!get_token){
					return alert("Logueate para poder ver la lista")
				}
				try{
					let response = await fetch(`${process.env.BACKEND_URL}/api/users`,{
						headers: {
							"Authorization": `Bearer ${get_token}`
						}
					})
					let data = await response.json()
					await setStore({dataUsers: data.results})
					return data.results
				}catch (e){
					console.error(e)
				}
			},

			register: async (datas) => {
				try{
					let response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
						method: "POST",
						body: JSON.stringify(datas),
						headers: {
							"Content-type": "application/json"
						}
					})
					let data = await response.json()

					if(response.ok){
						console.log("Registro existoso!")
					}else{
						alert("Algo salio mal")
					}
				}catch (e){
					console.error(e)
				}
			},

			login: async (infoLogin) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						body: JSON.stringify(infoLogin),
						headers: {
							"Content-Type": "application/json"
						}
					});

					console.log(response)
					
					if (!response.ok) {
						const errorData = await response.json();
						return { success: false, message: errorData.message || "Login fallido" };
					}
			
					let data = await response.json();
					console.log(data);
			
					if (data.access_token) {
						console.log("BIENVENIDO " + data.name);
						localStorage.setItem("token", data.access_token);
						localStorage.setItem("name", data.name);
						localStorage.setItem("email", data.email);
						
						return { success: true };
					} else {
						return { success: false, message: "No se pudo iniciar sesión" };
					}
			
				} catch (e) {
					console.error(e);
					return { success: false, message: "Error en la solicitud" };
				}
			},
			

			deleteUser: async (id) => {
				try{
					const store = getStore()
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`,{
						method: "DELETE"
					})
					let data = await response.json()
					console.log(data)
					if(response.ok){
						let listaFiltradaUsers = store.dataUsers.filter((item)=>item.id !== id)
						setStore({dataUsers: listaFiltradaUsers})
					}
					return response.json()

				}catch (e){
					console.error(e)
				}
				
			},


			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
