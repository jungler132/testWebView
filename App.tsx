import React, { useState, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Button, ActivityIndicator, Text } from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  const [uri, setUri] = useState('https://app.jobbler.co.uk/');
  const [env, setEnv] = useState('prod'); 
  const webViewRef = useRef(null);

  const reloadPage = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const toggleEnv = () => {
    const newEnv = env === 'prod' ? 'dev' : 'prod';
    const newUri = newEnv === 'prod'
      ? 'https://app.jobbler.co.uk/'
      : 'https://dev.jobbler.co.uk/';
    setEnv(newEnv);
    setUri(newUri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Syenergy" onPress={() => setUri('https://www.whatismybrowser.com/detect/is-javascript-enabled/')} />
        <Button title="Перезагрузить" onPress={reloadPage} />
        <Button
          title={`Switch to ${env === 'prod' ? 'Dev' : 'Prod'}`}
          onPress={toggleEnv}
        />
      </View>

      <View style={styles.envIndicator}>
        <Text>{env.toUpperCase()}</Text>
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri }}
        style={styles.webView}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  envIndicator: {
    alignItems: 'center',
    marginVertical: 5,
  },
  webView: {
    flex: 1,
  },
});

export default App;
