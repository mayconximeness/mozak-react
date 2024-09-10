import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verifica se o token do usuário está salvo no localStorage
  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      const token = JSON.parse(userToken).token;

      // Validação opcional do token com a API
      fetch('http://localhost:5000/private', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        if (response.ok) {
          // Token válido, manter o usuário logado
          setUser({ token });
        } else {
          // Token inválido, remover do localStorage
          localStorage.removeItem("user_token");
        }
      })
      .catch(() => {
        localStorage.removeItem("user_token");
      });
    }
  }, []);

  // Função para login
  const signin = async (email, senha) => {
    try {
      const response = await fetch('http://localhost:8800/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_token", JSON.stringify({ token: data.token }));
        setUser({ email });
        return;
      } else {
        return data.message; // Retorna mensagem de erro da API
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return "Erro ao fazer login";
    }
  };

  // Função para cadastro
  const signup = async (nome, email, password) => {
    try {
      const response = await fetch('http://localhost:8800/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome, // Usando o email como nome, mas pode ser alterado
          email,
          senha: password,
          confirmpassword: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return "Usuário criado com sucesso!";
      } else {
        return data.message; // Retorna mensagem de erro da API
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
