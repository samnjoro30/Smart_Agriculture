

export default function Login() {

    return(
        <div>
            <div>
                <div>
                    <label>Username</label>
                    <input
                       name="text"
                       type="text"
                       value=""
                       className=""
                       placeholder="john"
                       required
                    />
                    <input
                        name="password"
                        type="password"
                        value=""
                        className=""
                        required
                    />
                </div>
            </div>
        </div>
    )

}