import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import {
  AuthOperationName,
  useAuth,
  useEmailPasswordAuth,
  useUser,
} from '@realm/react';

export default function LoginScreen() {
  const { result, logInWithEmailPassword } = useAuth();
  const { register } = useEmailPasswordAuth();
  const user = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Automatically log in after registration
  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
    //   user.linkCredentials({ email, password });
      logInWithEmailPassword({ email, password });
    }
  }, [result, logInWithEmailPassword, email, password, user]);

//   console.log(result);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoComplete="email"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}       
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          placeholder="Password"
        />

        {result?.error?.operation ===
          AuthOperationName.LogInWithEmailPassword && (
          <Text style={[styles.error]}>
            There was an error logging in, please try again{' '}
          </Text>
        )}

        {result?.error?.operation === AuthOperationName.Register && (
          <Text style={[styles.error]}>
            There was an error registering, please try again
          </Text>
        )}

        <View style={styles.buttons}>
          <Pressable
            onPress={() => logInWithEmailPassword({ email, password })}
            style={[
              styles.button,
              result.pending && styles.buttonDisabled,
              styles.loginButton,
            ]}
            disabled={result.pending}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Pressable
            onPress={() => register({ email, password })}
            style={[
              styles.button,
              result.pending && styles.buttonDisabled,
              styles.registerButton,
            ]}
            disabled={result.pending}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  form: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: 'red',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'dodgerblue',
    marginRight: 10,
  },
  registerButton: {
    backgroundColor: 'green',
    marginLeft: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

