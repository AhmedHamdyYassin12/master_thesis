import React from 'react';
import * as Keychain from 'react-native-keychain';

const SecureStoreComponent = () => {
  
  // Function to store the credential
  const storeCredential = async (credential) => {
    try {
      // Convert credential object to a string
      const credentialString = JSON.stringify(credential);

      // Store the credential in the keychain with biometric access control
      await Keychain.setGenericPassword('credential_key', credentialString, {
        service: 'com.traintickets.usercredentials',
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET, 
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });

      console.log('Credential is securely stored with biometric protection');
    } catch (error) {
      console.error('Could not store the credential', error);
    }
  };

  // Function to retrieve the credential
  const retrieveCredential = async () => {
    try {
      // Retrieve the credential from the keychain
      const credentials = await Keychain.getGenericPassword({
        service: 'com.traintickets.usercredentials',
      });

      if (credentials) {
        console.log('Credentials successfully retrieved with biometric', credentials);
        return JSON.parse(credentials.password);
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.error('Could not retrieve the credential with biometric', error);
    }
  };

  // Example usage
  const credentialToStore = {
    // Your MVC hash or other credentials
  };

  storeCredential(credentialToStore); // Store the credential
  retrieveCredential(); // Retrieve the credential

  return (
    <div>
      {/* Your component UI here */}
    </div>
  );
};

export default SecureStoreComponent;
