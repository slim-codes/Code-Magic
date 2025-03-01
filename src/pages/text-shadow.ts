import * as utils from '../lib/general';

type Values = {
  hOffset: string;
  vOffset: string;
  blur: string;
  color: string;
  text: string;
};

let isSliderOpen = false;
const attribute = 'text-shadow';

function copyHandler() {
  const outputElement = utils.getOutput(attribute);
  utils.copyCodeToClipboard(attribute, outputElement);
  utils.showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

function pngDownloadHandler() {
  const outputElement = utils.getOutput(attribute);
  utils.downloadPNG(attribute, outputElement);
}

function svgDownloadHanlder() {
  const outputElement = utils.getOutput(attribute);
  utils.downloadSVG(attribute, outputElement);
}

export function textShadowGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getInputElement = utils.getInputText(attribute);

  const horizontalOffset = utils.getShadowHorizontalOffset(attribute);
  const verticalOffset = utils.getShadowVerticalOffset(attribute);
  const blur = utils.getShadowBlur(attribute);
  const color = utils.getShadowColor(attribute);
  const getOutputElement = utils.getOutput(attribute);
  const resultPage = utils.getResultPage();

  if (getInputElement.value.length === 0) {
    utils.triggerEmptyAnimation(getInputElement);
    return;
  }
  resultPage.style.display = 'flex';
  if (type === 'oldResults') return;

  const values: Values = {
    hOffset: horizontalOffset.value,
    vOffset: verticalOffset.value,
    blur: blur.value,
    color: color.value,
    text: getInputElement.value,
  };

  getTextShadowResult(values, getOutputElement);
}

/**
 * sets the result to the output element
 *
 * @param values values entered by users
 * @param outputElement output element to display result
 */
function getTextShadowResult(values: Values, outputElement: HTMLElement): void {
  const createTextShadowElement = (
    textShadowElement: HTMLElement,
    values: Values
  ) => {
    textShadowElement.innerText = values.text;
    textShadowElement.style.textShadow = `${values.hOffset}px ${values.vOffset}px ${values.blur}px ${values.color}`;
  };
  createTextShadowElement(outputElement, values);

  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
}

export function addTextShadowListener(): void {
  const horizontalOffset = utils.getShadowHorizontalOffset(attribute);
  const verticalOffset = utils.getShadowVerticalOffset(attribute);
  const blur = utils.getShadowBlur(attribute);
  const color = utils.getShadowColor(attribute);

  const getInputElement = utils.getInputText(attribute);
  const getPNGButtonElement = utils.getPNGButton(attribute);
  const getSVGButtonElement = utils.getSVGButton(attribute);
  const preview = utils.getPreviewSlider(attribute);

  const allTextShadowInputs = [horizontalOffset, verticalOffset, blur, color];
  const allTextShadowInputsFields = utils.getShadowFields(attribute, [
    'h-offset',
    'v-offset',
    'blur',
    'text',
  ]);

  const getShadowValue = () =>
    `${horizontalOffset.value}px ${verticalOffset.value}px ${blur.value}px ${color.value}`;

  preview.style.textShadow = getShadowValue();

  allTextShadowInputs.forEach((input, idx) => {
    // default
    if (idx < 3) {
      allTextShadowInputsFields[idx].textContent = `${input.value}px`;
    }
    getInputElement.addEventListener('input', () => {
      preview.innerText = getInputElement.value;
      preview.style.textShadow = getShadowValue();
    });
    input.addEventListener('input', () => {
      if (getInputElement.value === '' || color.value === '') return;
      preview.innerText = getInputElement.value;
      utils.slideIn(preview, isSliderOpen);

      isSliderOpen = true;

      if (idx < 3) {
        allTextShadowInputsFields[idx].textContent = `${input.value}px`;
      }
      preview.style.textShadow = getShadowValue();
    });

    getPNGButtonElement.addEventListener('click', pngDownloadHandler);

    getSVGButtonElement.addEventListener('click', svgDownloadHanlder);
  });
}
