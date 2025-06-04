const baseAPI = "http://localhost:9000";

const getButtons = async () => {
    try {
        const res = await fetch(`${baseAPI}/v1/api/buttons/get-all-buttons`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.log(err);
    }
};
export default getButtons;