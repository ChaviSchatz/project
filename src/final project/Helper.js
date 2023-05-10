import { useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
export  function Helper(state)
{
    const {comp} = useParams();
    console.log("comp: ", comp);
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/${comp}`);
    }, []);

}