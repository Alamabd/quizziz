import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import Statusbar from "../utils/Statusbar";
import { Style } from "@capacitor/status-bar";

export default function Information() {
  const History = useHistory();

  const goback =async () => {
    Statusbar({style: Style.Dark});
    History.goBack();
  }

  return (
    <IonPage>
      <IonContent class="ion-padding">
        <button className="mt-6 outline-none" onClick={() => goback()}>
          <IonIcon icon={chevronBackOutline} size="large" />
        </button>
        <div className="mx-2">
          <h2>Informasi aplikasi</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos inventore, laboriosam vel nobis debitis optio, voluptatibus doloribus natus consectetur, aspernatur sapiente itaque explicabo facilis neque nam quibusdam cupiditate consequatur voluptatem?</p>
          <p className="mt-5">v1.0.0</p>
        </div>
      </IonContent>
    </IonPage>
  )
}
