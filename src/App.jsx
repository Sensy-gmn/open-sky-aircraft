import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
    const [data, setData] = useState([]);
    const [inputDate, setInputDate] = useState("");
    const [dataDisplayed, setDataDisplayed] = useState(false);

    const params = {
        api_key: "FIgUzMaT7zU1jL2DVl2higbGzfpyhDC8JdRlOwm4",
    };
    const urlBase = `https://api.nasa.gov/planetary/apod/`;
    const endpointDate = `?date=${inputDate}`;

    const fetchData = () => {
        setDataDisplayed(true);
        axios
            .get(urlBase + endpointDate, { params })
            .then((response) => {
                const apiResponse = response.data;
                setData(apiResponse);
            })

            .catch((error) => {
                console.log(error);
            });
    };

    const resetData = () => {
        setDataDisplayed(false);
        setData([]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(data);
    return (
        <>
            <div className="flex flex-col mx-auto h-screen ">
                <h1 className="text-4xl font-bold text-center text-white">
                    Choisir une date pour y afficher l&apos;image du jour
                </h1>

                {dataDisplayed ? (
                    <div className="">
                        <div className="container mx-auto ">
                            <img
                                src={data.hdurl}
                                alt={data.title}
                                className="absolute top-0 left-0 w-full h-screen object-contain z-[-100] shadow-xl"
                            />
                            <div className="flex flex-col my-12 items-center shadow-md mx-auto rounded-xl relative bg-gray-400 opacity-50 text-white">
                                <button
                                    onClick={resetData}
                                    className="bg-gray-300 px-10 text-sm text-red-700 rounded-xl"
                                >
                                    Reset
                                </button>
                                <h2 className="text-2xl font-bold">
                                    {data.title}
                                </h2>
                                <p className="text-xl">{data.date}</p>
                                <p className="text-md my-6">
                                    {data.explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto h-screen ">
                        <div className="flex flex-col my-12 items-center shadow-md mx-auto bg-gray-400 rounded-xl text-gray-800">
                            <form
                                className="my-12 p-6 "
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    fetchData();
                                }}
                            >
                                <label className="flex gap-12">
                                    <p>Date :</p>
                                    <input
                                        type="date"
                                        onChange={(e) =>
                                            setInputDate(e.target.value)
                                        }
                                        required={true}
                                        className=""
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="bg-slate-500 mx-auto rounded-xl p-2"
                                >
                                    Rechercher
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
