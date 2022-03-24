//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Stakes is ERC20, Ownable {
    using SafeMath for uint256;

    Token public token;

      /**
     * @notice
     * A stake struct is used to represent the way we store stakes, 
     * A Stake will contain the users address, the amount staked and a timestamp, 
     * Since which is when the stake was made
     */
    struct Stake{
        address user;
        uint256 amount;
        uint256 since;
    }

    /**
    * @notice Stakeholder is a staker that has active stakes
     */
    struct Stakeholder{
        address user;
        Stake[] address_stakes;
    }
    address _owner;
    uint tokenAmount = 1000;
    Stakeholder[] internal stakeholders;

    mapping(address => uint256) internal stakes;
    mapping(address => uint256) internal rewards;

    event Staked(address indexed user, uint256 amount, uint256 index, uint256 timestamp);

    event TokensPurchased(
        address account,
        address token,
        uint amount
    );

    constructor(uint256 _supply) ERC20("Stake", "STK") {
        _owner = msg.sender;
        _mint(msg.sender, _supply * (10 ** decimals()));
    }

    function buyToken() public payable {
        // Calculate the number of tokens to buy

        require(token.balanceOf(address(this)) >= tokenAmount);

        token.transfer(msg.sender, tokenAmount);

        // Emit an event
        emit TokensPurchased(msg.sender, address(token), tokenAmount);
    }

    function modifyTokenBuyPrice(uint256 value) public onlyOwner payable {
        require(msg.sender == _owner);
        tokenAmount = value;
    }

    function createStake(uint256 _stake)
        public payable
    {
        require(_stake > 0, "Cannot stake nothing");

        _burn(msg.sender, _stake);
        uint256 index = stakes[msg.sender];
        uint256 timestamp = block.timestamp;
        if(index == 0){
            index = addStakeholder(msg.sender);
        }
        stakeholders[index].address_stakes.push(Stake(msg.sender, _stake, timestamp));
        // Emit an event that the stake has occured
        emit Staked(msg.sender, _stake, index,timestamp);   
    }

    function addStakeholder(address _stakeholder)
        public returns (uint256)
    {
        stakeholders.push();
        uint256 userIndex = stakeholders.length - 1;
        stakeholders[userIndex].user = _stakeholder;
        stakes[_stakeholder] = userIndex;
        return userIndex; 
    }

    function calculateReward(Stakeholder memory _stakeholder)
        public
    {
        for (uint256 s = 0; s < _stakeholder.address_stakes.length; s += 1){
            uint256 _since = _stakeholder.address_stakes[s].since;
            if((block.timestamp - _since) / 60 / 60 / 24 == 7) {
                uint256 reward = 0;
                rewards[_stakeholder.user] = rewards[_stakeholder.user].add(reward);
            } else {
                uint256 reward = _stakeholder.address_stakes[s].amount / 100; 
                rewards[_stakeholder.user] = rewards[_stakeholder.user].add(reward);
            }
        }
    }

     function withDrawRewards() 
        public
    {
        for (uint256 s = 0; s < stakeholders.length; s += 1){
            Stakeholder memory stakeholder = stakeholders[s];
            calculateReward(stakeholder);
        }
    }
}

contract Token is ERC20 {

    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;

     constructor(uint256 _supply) ERC20("Token", "TOK") {
        _mint(msg.sender, _supply * (10 ** decimals()));
    }
}