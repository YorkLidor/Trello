// import gsdfg from '../assets/img/spinner.svg'

export function Spinner() {

    return <main className="board flex column justify-center">
        <div className='spinner'
            style={{
                width: '30px', height: '30px', margin: '0 auto', backgroundImage: 'url(https://a.trellocdn.com/prgb/assets/images/spinner.24976c46bbf8be9db663.svg)', backgroundPosition: 'center', backgroundSize: 'cover'
            }}
        ></div>
    </main >
}
