export const uploadImageCloudinary  = async (data) => {
    try{
        // setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/djntomnvt/image/upload', //url de cloudinary
            {
                method: 'POST',
                body: data
            }
        );
        const succes = await res.json();
        return succes.secure_url;
        //  setImgeUrl(succes.secure_url);
        //  setLoading(false);
    }
    catch(error){
        console.log(error)
       
    }
};


//  if (!title || !description || !organization && !startDate || !contact || !linkInscription) {