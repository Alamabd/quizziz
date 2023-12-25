import { IonContent, IonSpinner } from "@ionic/react";

export default function Loader() {
  return (
    <IonContent>
      <div className="absolute left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%]">
        <img width={80} className="mx-auto" src="./favicon.png" />
        <h2>Quizziz</h2>
      </div>
      <div className="absolute bottom-14 left-1/2 translate-x-[-50%] text-sm">
        <IonSpinner></IonSpinner>
      </div>
    </IonContent>
  )
}