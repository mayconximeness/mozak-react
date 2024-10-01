import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      const token = JSON.parse(userToken).token;

      fetch('http://localhost:8080/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        if (response.ok) {
          setUser({ token });
        } else {
          localStorage.removeItem("user_token");
        }
      })
      .catch(() => {
        localStorage.removeItem("user_token");
      })
    }
  }, []);


  // Função para login
  const signin = async (email, senha) => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_token", JSON.stringify({ token: data.token }));
        setUser({ email });
        return;
      } else {
        return data.error; // Retorna mensagem de erro da API
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return "Erro ao fazer login";
    }
  };

  // Função para cadastro
  const signup = async (nome, emailCadastro, senhaCadastro) => {
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: nome, // Usando o email como nome, mas pode ser alterado
          email: emailCadastro,
          password: senhaCadastro,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_token", JSON.stringify({ token: data.token }));
        setUser({ email: emailCadastro });
        return "Usuário criado com sucesso!";
      } else {
        return data.error; // Retorna mensagem de erro da API
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return "Erro ao criar usuário";
    }
  };

  // Função para logout
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
