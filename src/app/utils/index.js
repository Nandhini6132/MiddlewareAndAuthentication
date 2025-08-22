

export const signUpFieldFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        type: 'text',
        placeholder: 'Enter User Name',
        componentType: 'input'
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter Email',
        componentType: 'input'
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter Password',
        componentType: 'input'
    },
    {
        componentType:'button',
        label:'Submit',
        type:'submit'
    }
]


export const loginFieldFormControls=[
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter Email',
        componentType: 'input'
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter Password',
        componentType: 'input'
    },
    {
        componentType:'button',
        label:'Submit',
        type:'submit'
    }
]

export const signUpFieldInitialdata={
    userName:'',
    email:'',
    password:''
}


export const loginFieldInitialdata={
    email:'',
    password:''
}