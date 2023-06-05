import axios from "axios";
import { urlInventory } from "./endpoints.ts";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {UpdateItem } from "./UpdateItem.js"
import { HeaderManager } from "./HeaderManager.js";
import { getToken } from "./TockenService.js";

export function EditInventory() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(schema),
    });

    const inventory = useRef(null);
    const [r, setR] = useState(false);
    const [addItem, setItem] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    console.log("1",updateState)
    const updatingItem = useRef(null);

    const getInventory = async () => {
        var config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };
        await axios.get(urlInventory + "/all", config)
            .then(response => {
                if (response.status < 299) {
                    console.log(response.data);
                    inventory.current = response.data;
                    setR(true);
                }
            })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        getInventory();
    }, []);

    return (
        <>
        <header>
            <HeaderManager></HeaderManager>
        </header>
        <html dir="rtl">
            {updateState == false &&
            <>
            <p>עדכון מלאי</p>
            <button class="btn btn-outline-dark btn-lg" onClick={() =>{
                updatingItem.current = {
                    code: "",
                    description: "",
                    id: "",
                    price: 0,
                    colors: []
                }
                setUpdateState(true);
            }}>הוספת מוצר</button>
            
            {inventory.current != null &&
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">תאור</th>
                            <th scope="col">קוד</th>
                            <th scope="col">מחיר</th>
                            <th scope="col">צבעים</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.current.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.description}</td>
                                        <td>{item.code}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            
                                            <ol>
                                            {

                                                item.colors.map((color, i) => {
                                                    return (
                                                        <>
                                                        {/* <div style={{textAlign: "right", marginRight: "130px"}}> */}
                                                            <li>{color}</li>
                                                            {/* </div> */}
                                                        </>
                                                    )
                                                })
                                            }   
                                            </ol>                                         
                                            
                                        </td>
                                        <td>
                                            <button class="btn btn-primary" onClick={() =>{
                                                updatingItem.current = inventory.current[index];
                                                 setUpdateState(true);
                                            }}>לעדכון פריט</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>

            }
        </>
        }
        </html>
    
        {
            updateState == true &&
            <>
            <UpdateItem prop = {updatingItem.current}></UpdateItem>
            </>
        }
        </>
    )
}