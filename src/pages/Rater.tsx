import { Preferences } from "@capacitor/preferences";
import { IonButtons, IonContent, IonIcon, IonPage } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import Statusbar from "../utils/Statusbar";
import { Style } from "@capacitor/status-bar";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Raters: React.FC = () => {

    const [value, setValue] = useState(0);
    const History = useHistory();

    const goback =async () => {
        Statusbar({style: Style.Dark});
        History.goBack();
    }

    const getValue = async() => {
        const value = await Preferences.get({key: "value"});
        if(value.value) {
            setValue(parseInt(value.value));
        } else {
            setValue(0);
        }
    }

    
    useEffect(() => {
        getValue();
    })
    return(
        <IonPage>
            <IonContent fullscreen class="ion-padding">
                <IonButtons className="mt-6 outline-none" onClick={() => goback()}>
                    <IonIcon icon={chevronBackOutline} size="large" />
                </IonButtons>
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center">
                    <h2>congratulations</h2>
                    <div className="mx-auto w-28 h-28 rounded-full bg-green-600 text-white font-semibold flex justify-center items-center">
                        <h1 className="text-5xl">{value}</h1>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Raters;