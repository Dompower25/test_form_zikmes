import { createClient } from "@supabase/supabase-js";
import "regenerator-runtime/runtime";
import "../scss/main.scss";
import "../index.html";
import "../css/all.css";

const orderButton = document.querySelector(".order__button");
const orderForm = document.querySelector(".form__order");
const orderInput = document.querySelector(".order__number__input");
const message = document.querySelector(".sendingAPI");

const SUPABASE_URL = "https://mrbkldebjddhvgqsxhzv.supabase.co";
const supabase = createClient(
  SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYmtsZGViamRkaHZncXN4aHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjY2NDEsImV4cCI6MTk4Mzk0MjY0MX0.fuTAtwrZ_56IiFz7RNiGdo542XqCMAkmFZRmwXEZPRA"
);

async function readText() {
  try {
    const { data, error } = await supabase.from("text").select("*");
    return data;
  } catch (error) {
    throw error;
  }
}

async function insertText(inputText) {
  try {
    const { data, error } = await supabase
      .from("text")
      .insert([{ inputText: inputText }]);
  } catch (error) {
    console.log(error);
  }
}

async function sendingMess(text) {
  await insertText(text).then();
}
const feedBack = () => {
  message.innerHTML = " ";
};

orderButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (orderInput.value.length) {
    async function foo() {
      await sendingMess(orderInput.value);
      readText().then((element) => {
        console.log("на сервере ", element.length, " сообщение(й). ", element);
        message.innerHTML = `Сообщение успешно доставлено`;
        message.style.color = "blue";
        setTimeout(feedBack, 2000);
      });
    }
    foo();
    orderInput.value = "";
  } else {
    message.innerHTML = "Поле не должно быть пустым";
    message.style.color = "red";
    setTimeout(feedBack, 2000);
  }
});
