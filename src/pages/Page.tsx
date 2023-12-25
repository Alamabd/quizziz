// Ionic React
import { IonButtons,  IonContent,  IonHeader, IonMenuButton } from '@ionic/react';
import { useState } from 'react';

// Plugin
import { Toast } from '@capacitor/toast';
import { Share } from '@capacitor/share';

// Components
import Loader from '../components/Loader';
import { useHistory } from 'react-router';
import Statusbar from '../utils/Statusbar';
import { Style } from '@capacitor/status-bar';
import { Preferences } from '@capacitor/preferences';

const Page: React.FC = () => {
  const [render , setRender] = useState<boolean>(false);
  const History = useHistory();

  const shareapp =async () => {
    await Share.share({
      title: 'Disaster Quizziz',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://nival.com/',
    })
  }

  type goQuiz = {
    part: string,
    number: string
  }
  const goQuiz = async ({part, number}: goQuiz) => {
    Statusbar({style: Style.Light})
    await Preferences.remove({key: "value"});
    History.push(`/quiz/${part}/${number}`);
  }

  return (
    <>
      {render ? "" : <Loader />}
      <IonHeader class='ion-no-border' className={render ? 'block' : 'hidden'}>
        <div>
          <img className='z-0 absolute rounded-b-3xl' src="./wave.svg" alt="wave" />
          <IonButtons className='z-10 ms-2 pt-6' slot="start">
            <IonMenuButton color="light" className='text-[2rem]' />
          </IonButtons>
          <h3 className='relative ms-4 mt-2 text-white'>Quiziz</h3>
        </div>
        <div className='m-4 p-4 flex relative bg-gray-50 shadow-lg rounded-lg'>
          <div className='w-2/3'>
            <h4 className='m-0 font-bold'>Title</h4>
            <p className='text-sm my-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit voluptates est possimus.</p>
            <button onClick={() => shareapp()} className='mt-1 px-3 py-1 rounded-lg bg-sky-100 text-base font-semibold text-sky-700'>Share App</button>
          </div>
          <div className='w-1/3 place-self-end'>
            <img className='rounded-full' src="./ilustration.svg" alt="ilustration" />
          </div>
        </div>
      </IonHeader>

      <IonContent className={render ? 'block' : 'hidden'}>
        <div className='px-4'>
          <h4 className=''>Topik</h4>
          <div className='flex flex-wrap'>
            <button onClick={() => goQuiz({part: "gunung", number: "1"})} className='w-1/3 outline-none'>
              <div className='rounded-xl border'>
                <img className='mx-auto' src="./mountain.svg" alt="mountain" />
                <label className='text-base'>
                  Gunung
                </label>
              </div>
            </button>
            <button onClick={() => goQuiz({part: "pantai", number: "1"})} className='w-1/3 outline-none'>
              <div className='mx-2 rounded-xl border'>
                <img className='mx-auto' src="./beach.svg" width={64} alt="beach" />
                <label className='text-base'>
                  Pantai
                </label>
              </div>
            </button>
            <button onClick={() => goQuiz({part: "gempabumi", number: "1"})} className='w-1/3 outline-none'>
              <div className='rounded-xl border'>
                <img className='mx-auto' src="./seismograph.svg" alt="seismograph" />
                <label className='text-base'>
                  Gempa Bumi
                </label>
              </div>
            </button>
            <button onClick={() => goQuiz({part: "tsunami", number: "1"})} className='mt-4 w-1/3 outline-none'>
              <div className='rounded-xl border'>
                <img className='mx-auto' src="./tsunami.svg" alt="tsunami" />
                <label className='text-base'>
                  Tsunami
                </label>
              </div>
            </button>
            {/* <button onClick={() => goQuiz({part: "gunung", number: "1"})} className='mt-4 w-1/3 outline-none'>
              <div className='mx-2 rounded-xl border'>
                <img className='mx-auto' src="./storm.svg" alt="storm" />
                <label className='text-base'>
                  Angin
                </label>
              </div>
            </button> */}
            <button onLoad={() => setTimeout(() => setRender(true), 2000)} onClick={() => goQuiz({part: "tanahlongsor", number: "1"})} className='mt-4 w-1/3 outline-none'>
              <div className='rounded-xl border'>
                <img className='mx-auto' src="./earthquake.svg" alt="earthquake" />
                <label className='text-base'>
                  Tanah Longsor
                </label>
              </div>
            </button>
          </div>
        </div>
      </IonContent>
    </> 
  );
};

export default Page;
