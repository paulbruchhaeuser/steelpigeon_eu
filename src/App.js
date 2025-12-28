import "./App.css";
import Header from "./Header";
import Grid from "./Grid";
import Imprint from "./Imprint";
import Contact from "./Contact";

import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedXml, setSelectedXml] = useState(null);
  const [showImprint, setShowImprint] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggleArticle = () => {
    setIsOpen(!isOpen);
  };

  const openArticleWithXml = (xml) => {
    setSelectedXml(xml);
    setIsOpen(true);
  };

  const openImprint = () => {
    setShowImprint(true);
  };

  const closeImprint = () => {
    setShowImprint(false);
  };

  const openContact = () => {
    setShowContact(true);
  };

  const closeContact = () => {
    setShowContact(false);
  };

  return (
    <div className="App">
      <div className="main_content">
        <Header onImprintClick={openImprint} onContactClick={openContact} />

        {showImprint ? (
          <Imprint onClose={closeImprint} />
        ) : showContact ? (
          <Contact onClose={closeContact} />
        ) : (
          <Grid
            onItemClick={openArticleWithXml}
            articleIsOpen={isOpen}
            articleOnClose={toggleArticle}
            articleXml={selectedXml}
          />
        )}
      </div>
    </div>
  );
}

export default App;
