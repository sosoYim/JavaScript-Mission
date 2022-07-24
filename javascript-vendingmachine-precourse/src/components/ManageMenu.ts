import store from '@/store';
import { handleCharge } from '@/hooks';

export const ManageMenu = (store: store) => {
  const charge = store.store.charge;

  const $manageMenu = document.createElement('div');
  $manageMenu.className = 'vending-machine-manage-menu';

  const $manageCoinInput = document.createElement('div');
  const $manageCoinList = document.createElement('div');

  $manageCoinInput.innerHTML = `
    <h2>자판기 동전 충전하기</h2>
    <label>
      <input type="number" id="vending-machine-charge-input" placeholder="충전할 금액" min="0" step="10" />
    </label>
  `;

  const $manageButton = document.createElement('button');
  $manageButton.textContent = '충전하기';
  $manageButton.setAttribute('id', 'vending-machine-charge-button');

  $manageButton.addEventListener('click', () => {
    const $chargeInput = document.getElementById(
      'vending-machine-charge-input'
    ) as HTMLInputElement;
    handleCharge(store, $chargeInput);
  });

  const $chargeAmountWrap = document.createElement('div');
  $chargeAmountWrap.innerHTML = `
    보유 금액: <span id='vending-machine-charge-amount'>${Object.entries(
      charge
    ).reduce((acc, [coin, amount]) => acc + +coin * amount, 0)}</span>'원'
  `;
  $manageCoinInput.append($manageButton, $chargeAmountWrap);

  $manageCoinList.innerHTML = `
<h2>동전 보유 현황</h2>
<table>
  <thead>
    <tr>
      <td>동전</td>
      <td>개수</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>500원</th>
      <td id="vending-machine-coin-500-quantity">${charge[500]}개</td>
    </tr>
    <tr>
      <th>100원</th>
      <td id="vending-machine-coin-100-quantity">${charge[100]}개</td>
    </tr>
    <tr>
      <th>50원</th>
      <td id="vending-machine-coin-50-quantity">${charge[50]}개</td>
    </tr>
    <tr>
      <th>10원</th>
      <td id="vending-machine-coin-10-quantity">${charge[10]}개</td>
    </tr>
  </tbody>
</table>`;

  $manageMenu.append($manageCoinInput, $manageCoinList);

  return $manageMenu;
};
