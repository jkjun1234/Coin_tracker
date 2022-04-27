import {useState, useEffect} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [account, setAccount] = useState();
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=20")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        console.log(json);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

      {/**Loding 중이 아니면 아무것도 보여주지 않음*/}
      {loading ? <strong>Loading...</strong>: 
        <select>
          {/**.map() argment에 key값과 value 값이 필요한데 여기선 key값이 사용되지 않음
           * API의 json 코드에서 key 값이 존재하기 때문이다.
          */}
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          ))}

          {/** 코드 챌린지 내용
           * 내가 가지고있는 달러를 가지고 
           * 얼마의 코인을 구매 가능한지 변환하는 앱을 만들어보라
           * <li>태그 대신 <select> 태그를 사용할 것
          */}
        </select>
        }
        <h2>this 비트 코인을 ~개 살수 있습니다.</h2> 
        <input placeholder="please input your account"></input>
    </div>
  );
}

export default App;
