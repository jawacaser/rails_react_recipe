import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default ({props}) => {
    const defaultState = { ingredients: "" }
    const [oneRecipe, setOneRecipe] = useState(defaultState)
    const [imgValid, setImgValid] = useState(true)
    const { id } = useParams();
    const navigate = useNavigate();
    const errorImg = `https://lh3.googleusercontent.com/Mo9-E50rjYi1z6yUO4oT2-ATadk2qFqoDcLZv0GgMXPFeonfOpjL8HhOPr7yU3DFW6lRVTTgZ_nsvKSCBNqDsTry9YedPMp96M57OP2dfeX4_uXeJTQI2svmxaUOG2g36hWtsQYvIQxyNyjaRROqvFiaOtVr6lHdsnhVVRSZBnxUPWB3WX4M9YU6xoGZZac4aNX9m4GBxWfb4va6FxwT746gpiAAgrBElWtukms57JGFbtxx3B_rdsZ4YOxPUapQQ1Xl3eL2L_PPb-AU-wCrzD835pUIA7_101-jMtw-lKz12R2HRPZVCtsr7LUftZgBNuvlB-DzATW8GPb5B3TUIa89rUvYGXgVPE-vF1ILaio8zmMZ8LHssNPh1N6HQoq1CgCOGbRJDionHhZjNYwOZBYA8whVmv8nuI5kC8X3oHc6Y9mArynczgELKStAHMFIplx40RxhytURfOQW5_xWN9WpHdw-gCKGELq4CJ0dIbjvwlgmELjd1Hpft4AC3B7S3bMRiDe1ItfvjtEj__japVy_nSh-uW5iSMzY6lxw3Q5LkiHR0efGLw9Nd-pIAtRp0HMMF7nH0uHhFl4z9vaVvS0oE9u6SDSapj1mM3H7BI_6b53D9bohIyUXpmjkFgPpZathem4rmdEsccx3xKkCkN_k6G25JskyX6RuNYet3uZwomVdmKrc6jaW9GocvEIauzEIwgVi3WAxb50lmXY2i90BgCCo-4ySxjn_T5J9-L-Q4IoP29DKEBuMG6E4HVVPpOXXJrZgx5oYJ1jweTacr_VsenHoc2rnslOXXuv_H5YwnUgjwcHDh0ru9kv3V3bGTWOSpIFviMapGnyZkHVr54gFwXdl-LE9p6FxOzPO-g=w624-h290-no?authuser=0`

    useEffect(() => {
        const url = `/api/v1/show/${id}`

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                addToast("Uh oh, something went wrong...")
                throw new Error("Network response was not ok.");
            })
            .then(response => setOneRecipe(response))
            .catch(() => navigate("/recipes"));
    }, [])

    function addHtmlEntities(str) {
        return String(str)
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    let ingredientList = "No ingredients listed";
    
    if (oneRecipe.ingredients.length > 0) {
        ingredientList = oneRecipe.ingredients
            .split(",")
            .map((ingredient, index) => (
                <li key={index} className="list-group-item">
                    {ingredient}
                </li>
            ));
    }

    const recipeInstruction = addHtmlEntities(oneRecipe.instruction)
    
    return (
        <div>
            <div className="hero position-relative d-flex align-items-center justify-content-center">
                <img onError={()=> setImgValid(false)} src={ imgValid ? oneRecipe.image : errorImg } alt={`${oneRecipe.name} image`} className="img-fluid position-absolute" />
                <div className="overlay bg-dark position-absolute" />
                <h1 className="display-4 position-relative text-white">
                    {oneRecipe.name}
                </h1>
            </div>
            <div className="container pb-3 pt-3">
                <div className="row">
                    <div className="col-sm-12 col-lg-3">
                        
                        <ul className="list-group">
                            <h5 className="mb-2 text-center fw-bolder">Ingredients</h5>
                            {ingredientList}
                        </ul>
                    </div>
                    <div className="col-sm-12 col-lg-7 my-3">
                        <h5 className="mb-2 text-center fw-bolder">Preparation Instructions</h5>
                        <div dangerouslySetInnerHTML={{
                        __html: `${recipeInstruction}`
                        }}
                        />
                    </div>
                    <div className="col-sm-12 col-lg-2 text-center">
                            {/* TODO: Make this conditional based on if the recipe is owned by the user */}
                        <button type="button" className="btn custom-button mx-2" onClick={()=>navigate(`/edit/${id}`)}>
                            Edit Recipe
                        </button>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <button type="button" onClick={()=>navigate(-1)} className="btn btn-secondary w-25">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}