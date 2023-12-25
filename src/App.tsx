// Ionic React
import { IonApp, IonPage, IonRouterOutlet, IonSplitPane, createAnimation, setupIonicReact } from '@ionic/react';
import { useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

// Plugin
import { StatusBar } from '@capacitor/status-bar';

// Components
import Menu from './components/Menu';

// Pages
import Page from './pages/Page';
import Information from './pages/Information';
import Quiz from './pages/Quiz';
import Raters from './pages/Rater';

/* Core CSS required for Ionic components to work properly */
import './app.css';
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

  const setOverlay = async () => {
    await StatusBar.setOverlaysWebView({overlay: true});
  }

  const animeBuilder = (baseEl: any , opts: any) => {
    const entering = createAnimation()
      .addElement(opts.enteringEl)
      .fromTo('opacity', 1, 1)

    const leaving = createAnimation()
      .addElement(opts.leavingEl)
      .fromTo('opacity', 1, 0)

    const animation = createAnimation()
      .addAnimation(entering)
      .addAnimation(leaving);

    if(opts.direction === 'forward') {
      entering.fromTo('transform', 'translateX(100px)', 'translateX(0px')
      .duration(200);
    } else {
      entering.fromTo('transform', 'translateX(-100px)', 'translateX(0px')
      .duration(200);
    }
    return animation;
  }

  useEffect(() => {
    setOverlay();
  }, [])
  return (
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet animation={animeBuilder}>
            <Route path="/" exact={true}>
              <Redirect to="/page" />
            </Route>
            <Route path="/page/" exact={true}>
              <IonSplitPane contentId="main">
                <Menu />
                <IonPage id='main'>
                  <Page />
                </IonPage>
              </IonSplitPane>
            </Route>
            <Route path="/information/" exact={true}>
              <Information />
            </Route>
            <Route path="/quiz/:part/:number" exact={true}>
              <Quiz />
            </Route>
            <Route path="/rater" exact>
              <Raters />
            </Route>
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
