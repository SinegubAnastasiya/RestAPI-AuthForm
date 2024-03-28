const btn = document.querySelector('button')

btn.addEventListener('click', async () => {
    const username = document.querySelector('.username').value
    const email = document.querySelector('.email').value
    const phone = document.querySelector('.phone').value
    const pwd = document.querySelector('.pwd').value

    const response = await fetch('http://localhost:3000/user/reg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, phone, pwd })
    })

    const result = await response.json()
    console.log(result);
})