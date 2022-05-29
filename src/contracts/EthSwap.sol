
pragma solidity >=0.5.0 <0.9.0;
import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    event TokensPurchase(address account, address token, uint amount, uint rate);
    event TokensSold(address account, address token, uint amount, uint rate);

    constructor(Token _token) public {
        token = _token;
    }
    function buyTokens() public payable{
        // Calculate the number of token to buy
        uint tokenAmount = msg.value * rate;
        
        // Require that EthSwap has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        // transfer tokens to the user
        token.transfer(msg.sender, tokenAmount);

        // Emit an event 
        emit TokensPurchase(msg.sender, address(token), tokenAmount, rate);

    } 

    function sellTokens(uint _amount)  public {
        // User can't sell more token than they have
        require(token.balanceOf(msg.sender)>= _amount);
        
        // Calculate the amount of ether to redeem
        uint etherAmount = _amount / rate;

        // Require that EthSwap has enough Ether
        require(address(this).balance >= etherAmount);

        // Perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        //  Emit an event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }


}
