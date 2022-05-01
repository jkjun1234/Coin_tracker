import {useState, useEffect} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [account, setAccount] = useState(0);  // 나의 자산
  const [selectedName, setSelectedName] = useState(""); //선택한 코인이름
  const [selectedValue, setSelectedValue] = useState(''); //코인 가격
  const [viewcell, setViewcell] = useState('');     // 얼마 살수 있는지 알려주는 view
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=20")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        console.log(json);
      });
  }, []);
  const selectOnchange = (event) => {
    let selectedStr = event.target.value.split('_');    // value 값 name과 quotes 값 나누기
    
    setSelectedValue(selectedStr[1]);
    setSelectedName(selectedStr[0]); 
  };
  const accountInput = (event) => {
    //나의 자산 입력
    setAccount(event.target.value);
    console.log(event.target.value);
  };
  const onSubmit = (event) => {
    const coinPrice = Number(selectedValue);  // 코인 가격을 숫자형으로 변환
    event.preventDefault();   //기본동작(새로고침) 방지

    console.log(account);
    if(account === 0 || selectedName === "") {
      return setViewcell("코인을 선택하고 금액을 넣어주세요");
    }
    setAccount('');
    setViewcell(`${selectedName}(${coinPrice})을 ${(account/coinPrice).toFixed(2)}개 살수 있습니다!.`);
  };
 
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

      {/**Loding 중이 아니면 아무것도 보여주지 않음*/}
      {loading ? <strong>Loading...</strong>: 
        <select onChange={selectOnchange} value={selectedName+'_'+selectedValue}> 
          {/**select box 값 가져오기 */}   
          {/**.map() argment에 key값과 value 값이 필요한데 여기선 key값이 사용되지 않음
           * API의 json 코드에서 key 값이 존재하기 때문이다.
          */}
          {coins.map((coin) => (
            <option value={coin.name+'_'+Number((coin.quotes.USD.price)).toFixed(2)} >
              {coin.name} ({coin.symbol}) : ${Number((coin.quotes.USD.price)).toFixed(2)} {/**USD 값을 반올림 */}
            </option>
          ))
          }
        </select>
        }
        {/**account 입력*/}
        <h1>{viewcell}</h1>
        <form onSubmit={onSubmit}>
          <input placeholder="please input your account"
            onChange={accountInput}
            type='number'
            value={account}
          ></input>
          <button>변환!</button>
        </form>
    </div>
  );
}

export default App;
