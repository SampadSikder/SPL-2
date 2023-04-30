// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.5.0 <0.9.0;

contract stocktech {
    struct Order {
        uint orderID;
        string TradingCode;
        string BOAccountNo;
        string orderType;
        uint quantity;
        uint price;
        uint cost;
    }

    Order[] private orderlist;
    Order private newOrder;

    function takeOrder(
        uint _ID,
        string calldata _TradingCode,
        string calldata _BOAccountNo,
        string calldata _type,
        uint _quantity,
        uint _price
    ) public {
        newOrder.orderID = _ID;
        newOrder.TradingCode = _TradingCode;
        newOrder.BOAccountNo = _BOAccountNo;
        newOrder.orderType = _type;
        newOrder.quantity = _quantity;
        newOrder.price = _price;
        newOrder.cost = _quantity * _price;
        orderlist.push(newOrder);
    }

    function getOrder() public view returns (Order memory) {
        return (newOrder);
    }

    function getOrderAndHash() public view returns (Order memory, bytes32) {
        bytes32 hash = keccak256(
            abi.encodePacked(
                newOrder.orderID,
                newOrder.TradingCode,
                newOrder.BOAccountNo,
                newOrder.orderType,
                newOrder.quantity,
                newOrder.price,
                newOrder.cost
            )
        );

        return (newOrder, hash);
    }

    function getList() public view returns (Order[] memory) {
        return orderlist;
    }

    function cancelOrder(uint orderIDToDelete) public {
        uint indexToDelete;
        bool found = false;

        for (uint i = 0; i < orderlist.length; i++) {
            if (orderlist[i].orderID == orderIDToDelete) {
                indexToDelete = i;
                found = true;
                break;
            }
        }

        if (found) {
            for (uint i = indexToDelete; i < orderlist.length - 1; i++) {
                orderlist[i] = orderlist[i + 1];
            }
            orderlist.pop();
        }
    }
}
