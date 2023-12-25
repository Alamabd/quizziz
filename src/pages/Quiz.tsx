import { IonButtons, IonContent, IonIcon, IonPage } from "@ionic/react";
import { checkmark, chevronBackOutline, close } from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import Statusbar from "../utils/Statusbar";
import { Style } from "@capacitor/status-bar";
import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";

type QuizsType = {
    [key: string]: {
      [key: string]: {
        soal: string;
        a: string;
        b: string;
        c: string;
        d: string;
        jawaban: string;
      };
    };
  };
const quizs: QuizsType = {
    gunung: {
        1: {
            soal: "Gunung berapi yang memiliki releng yang landau, terbentuk karena magma cair yang membeku dari erupsi Effusive merupakan gunung merapi jenis ?",
            a: "Maar",
            b: "Corong",
            c: "Perisai",
            d: "Kerucut",
            jawaban: "c"
        },
        2: {
            soal: "Gunung api yang kawahnya selalu mengeluarkan asap disebut ?",
            a: "Gunung merapi",
            b: "Gunung mati",
            c: "Gunung istirahat",
            d: "Gunung aktif",
            jawaban: "d"
        },
        3: {
            soal: "Gunung api yang terbentuk melalui ledakan yang kuat dan membentuk corong yang besar pada bagian disebut gunung api tipe ?",
            a: "Maar",
            b: "Starto",
            c: "Hawaii",
            d: "Perisai",
            jawaban: "a"
        }
    },
    pantai: {
        1: {
            soal: "Untuk mendeteksi sunami disepanjang pantai, alat pengukur pasang surut pantai dipasang... km jauhnya ?",
            a: "100",
            b: "75",
            c: "50",
            d: "25",
            jawaban: "c"
        },
        2: {
            soal: "Metode manakah yang banyak digunakan untuk mengukur variabilitas bajir ?",
            a: "FFI",
            b: "FFMI",
            c: "FI",
            d: "FMI",
            jawaban: "b"
        }
    },
    gempabumi: {
        1: {
            soal: "Jenis gempa bumi yang dapat terjadi pada daerah kapus atau daerah pertambanga adalah ?",
            a: "Gempa tumbukan",
            b: "Gempa runtuhan",
            c: "Gempa buatan",
            d: "Gempa tektonik",
            jawaban: "b"
        },
        2: {
            soal: "Gempa bumi terktonik berarti ?",
            a: "Gempa yang terjadi karena tenaga buatan",
            b: "Gempa yang terjadi karena aktifitas gunung api",
            c: "Gempa yang terjadi karena runtuhan",
            d: "Gempa yang terjadi karena pergerakan lempeng bumi",
            jawaban: "d"
        },
        3: {
            soal: "Jenis gempa berdasarkan kedalaman hiposentrumnya dibedakan menjadi 3 yaitu ?",
            a: "Tektonik, Vulkanik, dan Runtuhan",
            b: "Dalam, sedang, dan jauh",
            c: "Sedang, dangkal, dan sangat jauh",
            d: "Sedang, dangkal, dan dalam",
            jawaban: "d"
        }
    },
    tsunami: {
        1: {
            soal: "Bencana alam tsunami bisa disebabkan oleh adanya ?",
            a: "Gempa bumi",
            b: "Angin topan",
            c: "Tanah longsor",
            d: "Kebakaran hutan",
            jawaban: "a"
        },
        2: {
            soal: "Hujan yang sangat deras dapat mengakibatkan banjir, langkah yang sebaiknya kita lakukan adalah ?",
            a: "Membeli pelampung",
            b: "Mengumpulkan sampah dan mendaur ulang",
            c: "Mencari tempat lebih tinggi",
            d: "Menonton banjir ditepi sungai",
            jawaban: "b"
        },
        3: {
            soal: "Bajir dan genangan adalah 2 hal yang berbeda dalam hal ?",
            a: "Faktor pentebab",
            b: "Lokasi geografis",
            c: "Kecepatan aliran",
            d: "Durasi kejadian",
            jawaban: "c"
        }
    },
    tanahlongsor: {
        1: {
            soal: "Korban tanah longsor biasanya dibawa ke ?",
            a: "Tempat pengungsian",
            b: "Hotel",
            c: "Rumah",
            d: "Lapangan",
            jawaban: "a"
        },
        2: {
            soal: "Bencana yang terjadi berupa tanah runtuh dari bukit atau pegunungan dinamakan ?",
            a: "Banjir bandang",
            b: "Tanah lonsor",
            c: "Angin topan",
            d: "Tsunami",
            jawaban: "b"
        },
        3: {
            soal: "Manakah dibawah ini yang termasuk jenis tanah longsor ?",
            a: "Longsoran tebing",
            b: "Pergerakan blok",
            c: "penyuburan tanah",
            d: "Gunung meletus",
            jawaban: "a"
        }
    }
}

const Quiz: React.FC = () => {
    type params = {
        part: string,
        number: string
    }
    const {part, number} = useParams<params>();
    const History = useHistory();
    const [answer, setAnswer] = useState("");
    const [valid, setValid] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);
    const [count, setCount] = useState<number>(10);
    var countdown: any;

    const goback =async () => {
        Statusbar({style: Style.Dark});
        History.goBack();
    }

    const getValue = async() => {
        const value = await Preferences.get({key: "value"});
        if(value.value) {
            setValue(parseInt(value.value));
        }
    }

    const jawaban = quizs[part]?.[number].jawaban;
    const numSoal = Object.keys(quizs[part]).length;
    const addValue = 100 / numSoal;
    
    const handleSelect = (selc: string) => {
        setAnswer(selc);
        clearInterval(countdown);
        const val = value + addValue;
        if(parseInt(number) < numSoal) {
            if(selc === jawaban) {
                setValid(true);
                Preferences.set({
                    key: "value",
                    value: val.toString()
                });
                setTimeout(() => {
                    History.replace(`/quiz/${part}/${parseInt(number) + 1}`);
                }, 2000);
                
            } else {                
                setValid(false);
                setTimeout(() => {
                    History.replace(`/quiz/${part}/${parseInt(number) + 1}`);
                }, 2000);
            }
        } else {
            if(selc === jawaban) {
                setValid(true);
                Preferences.set({
                    key: "value",
                    value: val.toString()
                })
                
            } else {
                setValid(false);
                
                Preferences.set({
                    key: "value",
                    value: value.toString()
                })
            }

            setTimeout(() => {
                Statusbar({style: Style.Light});
                History.replace('/rater');
            }, 2000);
        }
    }

    useEffect(() => {
        getValue();
    }, [answer]);

    useEffect(() => {
        setCount(10);
        setAnswer("");
    }, [number]);

    // Coutdown
    useEffect(() => {
        countdown = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount === 0) {
                    setAnswer("z");
                    setTimeout(() => {
                        if(parseInt(number) < numSoal) {
                            Statusbar({style: Style.Light});
                            History.replace(`/quiz/${part}/${parseInt(number) + 1}`);
                        } else {
                            Statusbar({style: Style.Light});
                            History.replace('/rater');
                        }
                    }, 2000);
                    clearInterval(countdown);
                    return prevCount;
                } else {
                    return prevCount - 1;
                }
            });
        }, 1000);

        return () => {
            clearInterval(countdown);
        };
    }, [count]);

    return(
        <IonPage>
            <IonContent class="ion-padding">
                <div className="mt-4 flex items-center justify-between">
                    <IonButtons className="outline-none" onClick={() => goback()}>
                        <IonIcon icon={chevronBackOutline} size="large" />
                    </IonButtons>
                    <h3>{count}</h3>
                </div>
                <div className="mt-8 p-2 rounded-lg border">
                    <h3>Soal {number}</h3>
                    <p>{quizs[part]?.[number].soal}</p>
                </div>
                <div className="mt-4 flex justify-between gap-3">
                    {/* a */}
                    {answer === "a" || answer === ""
                        ? <IonButtons onClick={() => handleSelect("a")} class="p-3 w-1/2 rounded bg-sky-500 text-white text-xl">
                            A. {quizs[part]?.[number].a}
                            {/* valid */}
                            {answer === "a"
                                ? 
                                    valid 
                                        ? <IonIcon className="ms-auto text-2xl" icon={checkmark} />
                                        : <IonIcon className="ms-auto text-2xl" icon={close} />
                                : ""
                            }
                            {/*  */}
                        </IonButtons>
                        : <IonButtons class="p-3 w-1/2 rounded bg-gray-400 text-white text-xl">
                            A. {quizs[part]?.[number].a}
                        </IonButtons>
                    }
                    {/* b */}
                    {answer === "b" || answer === ""
                        ? <IonButtons onClick={() => handleSelect("b")} class="p-3 w-1/2 rounded bg-red-500 text-white text-xl">
                            B. {quizs[part]?.[number].b}
                            {/* valid */}
                            {answer === "b"
                                ? 
                                    valid 
                                        ? <IonIcon className="ms-auto text-2xl" icon={checkmark} />
                                        : <IonIcon className="ms-auto text-2xl" icon={close} />
                                : ""
                            }
                            {/*  */}
                        </IonButtons>
                        : <IonButtons class="p-3 w-1/2 rounded bg-gray-400 text-white text-xl">
                            B. {quizs[part]?.[number].b}
                        </IonButtons>
                    }
                    
                </div>
                <div className="mt-4 flex justify-between gap-3">
                    {answer === "c" || answer === ""
                        ? <IonButtons onClick={() => handleSelect("c")} class="p-3 w-1/2 rounded bg-yellow-500 text-white text-xl">
                            C. {quizs[part]?.[number].c}
                            {/* valid */}
                            {answer === "c"
                                ? 
                                    valid 
                                        ? <IonIcon className="ms-auto text-2xl" icon={checkmark} />
                                        : <IonIcon className="ms-auto text-2xl" icon={close} />
                                : ""
                            }
                            {/*  */}
                        </IonButtons>
                        : <IonButtons class="p-3 w-1/2 rounded bg-gray-400 text-white text-xl">
                            C. {quizs[part]?.[number].c}
                        </IonButtons>
                    }
                    {answer === "d" || answer === ""
                        ? <IonButtons onClick={() => handleSelect("d")} class="p-3 w-1/2 rounded bg-green-500 text-white text-xl">
                            D. {quizs[part]?.[number].d}
                            {/* valid */}
                            {answer === "d"
                                ? 
                                    valid 
                                        ? <IonIcon className="ms-auto text-2xl" icon={checkmark} />
                                        : <IonIcon className="ms-auto text-2xl" icon={close} />
                                : ""
                            }
                            {/*  */}
                        </IonButtons>
                        : <IonButtons class="p-3 w-1/2 rounded bg-gray-400 text-white text-xl">
                            D. {quizs[part]?.[number].d}
                        </IonButtons>
                    }
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Quiz;