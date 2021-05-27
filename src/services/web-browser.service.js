import { Linking, Platform } from 'react-native';
import SafariView from 'react-native-safari-view';

export class WebBrowserService {

   openBrowserAsync = (url) => {
    if (Platform.OS === 'ios') {
      return WebBrowserService.openInAppUrl(url).catch(() => WebBrowserService.openUrl(url));
    } else {
      return WebBrowserService.openUrl(url);
    }
  };

    openInAppUrl = (url)=> {
    return SafariView.isAvailable()
                     .then(() => SafariView.show({ url }));
  };

  openUrl = (url) => {
    return Linking.openURL(url);
  };
}
