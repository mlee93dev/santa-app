import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Body = () => {
  const port = process.env.PORT || 3000;
  const [name, setName] = useState('');
  const [gifts, setGifts] = useState('');
  const navigate = useNavigate();

  const validateUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${port}/api/validate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name: name,
                gifts: gifts
            }
        })
      });
      const text = await response.text();
      if (response.status === 404) {
        navigate("/error", { state: { message: text } });
      } else {
        navigate("/success", { state: { message: text } });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <body>
      <header>
        <h1>A letter to Santa</h1>
      </header>

      <main>
        <p className="bold">Ho ho ho, what you want for Christmas?</p>

        who are you?
        <input name="userid" placeholder="charlie.brown" value={name} onChange={(e) => setName(e.target.value)} />
        <form onSubmit={(e) => validateUser(e)}>
          what do you want for christmas?
          <textarea
            rows={10}
            cols={45}
            maxLength={100}
            placeholder="Gifts!"
            value={gifts}
            onChange={(e) => setGifts(e.target.value)}
          ></textarea>
          <br />
          <button type="submit" id="submit-letter">Send</button>
        </form>
      </main>

      <footer>
        Made with <a href="https://glitch.com">Glitch</a>!
      </footer>

      <div
        className="glitchButton"
        style={{position: "fixed", top: "20px", right: "20px"}}
      ></div>
      <script src="https://button.glitch.me/button.js"></script>
  </body>
  )
};

export default Body;