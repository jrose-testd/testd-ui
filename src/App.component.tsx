import React, { useContext, useState } from 'react';
import { Button } from '@testd-io/testd-components';
import Firebase, { IFirebaseContext } from './context/FirebaseContext';
import './App.scss';

enum field {
  Email = "email",
  Password = "password"
}
enum button {
  Login = "login",
  SignUp = "signUp"
}

enum theme {
  Dark = "dark",
  Light = "light"
}
const App: React.FC = () => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const { auth }: IFirebaseContext = useContext<IFirebaseContext>(Firebase.useContext);
  const handleClick = (type: button) => async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!auth || !email || !password) {
      return;
    }
    try {
      const func = type === button.Login ? auth.signInWithEmailAndPassword : auth.createUserWithEmailAndPassword;
      const response = await func(email, password);
      alert(`Welcome ${response?.user?.email} `);
      console.log(response);
    } catch (e) {
      console.error(e)
    }
  }
  const handleChange = (inputField: field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    inputField === field.Email ? updateEmail(value) : updatePassword(value);
  }
  const handleTheme = (themeType: theme) => ()=> {
    document.getElementsByTagName('body')[0].className = `theme-${themeType}`;
  }
  return (
    <div className="app__wrapper">
      <header className="app__appHeader">
        <h1 className="app__appLink">Testd Login</h1>
        <input placeholder="Email" type={field.Email} onChange={handleChange(field.Email)} />
        <input placeholder="password" type={field.Password} onChange={handleChange(field.Password)} />
        <Button onClick={handleClick(button.Login)}>Login</Button>
        <Button onClick={handleClick(button.SignUp)}>Sign Up</Button>
        <Button onClick={handleTheme(theme.Dark)}>Use Dark Theme</Button>
        <Button onClick={handleTheme(theme.Light)}>Use Light Theme</Button>
      </header>
    </div>
  );
}

export default App;
