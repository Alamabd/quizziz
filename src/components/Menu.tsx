// Ionic React
import React, { useRef } from "react";
// import { StatusBar, Style } from "@capacitor/status-bar";
import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonToolbar } from "@ionic/react";
import {informationCircleOutline, shareOutline, starOutline} from 'ionicons/icons'
import { useHistory } from "react-router";

// Utils
import Statusbar from "../utils/Statusbar";

// Plugin
import { Share } from "@capacitor/share";
import { Style } from "@capacitor/status-bar";

const Menu: React.FC = () => {

  const History = useHistory();
  const ionmenu = useRef<HTMLIonMenuElement>(null);
  
  type urlPage = {
    url: string
  }
  const openpage = (urlpage: urlPage) => {
    Statusbar({style: Style.Light});
    ionmenu.current?.close();
    History.push(urlpage.url);
  }

  const shareapp =async () => {
    await Share.share({
      title: 'Disaster Quizziz',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://nival.com/',
    })
  }

  return (
    <IonMenu contentId="main" type="overlay" ref={ionmenu}>
      <IonHeader class="ion-no-border">
        <IonToolbar>
            <img src="./wave2.svg" alt="wave2" className="rounded-b-3xl" />
            <div className="absolute z-10 top-1/2 left-4 flex gap-2 items-center">
              <img className="left-4 mx-auto py-4 w-16" src="./favicon.png" alt="favicon" />
              <b className="text-white">V1.0</b>
            </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem className="pe-4" onClick={() => openpage({ url: "/information"})}>
            <IonLabel className="text-lg font-normal">
              <IonIcon className="me-3 relative top-[8px] text-2xl" icon={informationCircleOutline} />
              Informasi
            </IonLabel>
          </IonItem>
          <IonItem className="pe-4 text-gray-500">
            <IonLabel className="text-lg font-normal">
              <IonIcon className="me-3 relative top-[6px] text-2xl" icon={starOutline} />
              Beri Nilai
            </IonLabel>
          </IonItem>
          <IonItem className="pe-4" onClick={() => shareapp()}>
            <IonLabel className="text-lg font-normal">
              <IonIcon className="me-3 relative top-[6px] text-2xl" icon={shareOutline} />
              Bagikan
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
