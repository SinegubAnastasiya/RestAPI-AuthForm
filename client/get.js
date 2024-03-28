const btn = document.querySelector('button')

btn.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/user/', {
        method: 'GET'
    })

    const result = await response.json()
    console.log(result);
})