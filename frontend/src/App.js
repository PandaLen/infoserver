import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage';
import Groups from './pages/groups';
import GroupDetail from './pages/groupdetail';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Navigation } from './components/navigation';


const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Header title="Kpop" motto="Boy groups and girl groups"/>
        <Navigation/>
        <main className='container'>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/groups" element={<Groups/>}/>
            <Route path="/groups/:id" element={<GroupDetail/>}/>
          </Routes>
        </main>
        <Footer copyright={{projectName: "Ročníkový projekt IT2", projectAuthor: "Lukáš a Růženka"}}/>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;