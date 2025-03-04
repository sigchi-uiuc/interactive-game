import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {  
  /*
  Keeping with our spy analogy, const navigate is the phoneline LandingPage will use to transfer missions to other agents. useNavigate() is the company they 
  have contracted to run these services.
  */
  const [player, setPlayer] = useState();
  const navigate = useNavigate();

  // handle button click (start game) - The function name can be changed
  const startGame = () => {
    if (player) {
      navigate("/practice", { state: { player } });
    } else {
      alert("Please enter a username to start the game.");
    }
  }

  // need to implement return part
  return (
    <div className="landing-page">
      {/*We are creating a spy gadget (component) called Button. This button sends the mission to the practice page by using the phoneline we set up earlier. Here's a 
      list of react components and the basics of how to implement them https://react.dev/reference/react-dom/components. React isn't easy, so if you find
      yourself confused trying google how to make *insert hyperspecific thing you are trying to build* in react and you'll get a bunch of helpful tutorials.
      (Sometimes mr.gpt does a real good job on telling you how to do this, but sometimes it does not)*/}
      <input
        type="text"
        className="input"
        placeholder="Enter your username"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
        onClick
      />

      <button className="btn" onClick={startGame}> 
        Go to Practice
      </button>
    </div>
  );
}

/*
One thing you will see here is that instead of giving detailed styling for the button I gave it a class="btn". For this project, I've tried to implement a 
CSS system called DaisyUI. DaisyUI (like tailwind and other such things) is basically a set of css presets. Instead of defining everything about your button,
you can just simply as Daisy for how she likes to style her button by doing class="btn" (btn being the name of her preset). Here's a website listing all the 
things Daisy can help you withh https://daisyui.com/components/. Either jsx or html should work - just use whichever one works, javascript is finnicky.
*/

export default LandingPage;
