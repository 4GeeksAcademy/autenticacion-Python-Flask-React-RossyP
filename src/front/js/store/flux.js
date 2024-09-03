

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
				try{
					let response = await fetch("https://turbo-couscous-9vq57r7r9wxcp4x7-3001.app.github.dev/users")
					let data = await response.json()
					await setStore({dataUsers: data.results})
					return data.results
				}catch (e){
					console.error(e)
				}
			},

			register: async (datas) => {
				try{
					let response = await fetch("https://turbo-couscous-9vq57r7r9wxcp4x7-3001.app.github.dev/register", {
						method: "POST",
						body: JSON.stringify(datas),
						headers: {
							"Content-type": "application/json"
						}
					})
					let data = await response.json()

					if(response.ok){
						alert("Registro existoso!")
					}else{
						alert("Algo salio mal")
					}
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
