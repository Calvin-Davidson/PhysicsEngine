const event = new EventSystem();


function listener(data) {
    console.log(data[0] ? data[0] : "no result");
}

function secondListener() {
    console.log("hohohoho");
}

event.AddListener(listener);
event.AddListener(secondListener);

for (let i = 0; i < 10; i++) {
    console.log(i);
    if (i === 5) event.Invoke("test");
    if (i === 7) event.Invoke();
}