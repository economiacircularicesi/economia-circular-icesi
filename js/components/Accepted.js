class Accepted {
    constructor(accepted, counter) {
        this.accepted = accepted;
        this.counter = counter;
    }
    render = () => {

        let component = document.createElement('div');
        component.className = 'accepted';

        let sepline = document.createElement('div');
        sepline.className = 'request__sepline';
        if (this.counter != 0) {
            component.appendChild(sepline);
        }


        let left = document.createElement('div');
        left.className = 'accepted__left';
        component.appendChild(left);


        let right = document.createElement('div');
        right.className = 'accepted__right';
        component.appendChild(right);

        let name = document.createElement('p');
        name.className = 'text text__subheading';
        name.innerHTML = this.accepted.name + ' ' + this.accepted.lastName;
        left.appendChild(name);

        let id = document.createElement('p');
        id.className = 'text text__cuerpo';
        id.innerHTML = 'id:' + this.accepted.id;
        left.appendChild(id);

        let email = document.createElement('div');
        email.className = 'accepted__row';

        let email_icon = document.createElement('img');
        email_icon.className = 'job_icon';
        email_icon.src = './images/email.png';
        email.appendChild(email_icon);

        let company_icon = document.createElement('img');
        company_icon.className = 'company_icon';
        company_icon.src = './images/company.png';


        let job_icon = document.createElement('img');
        job_icon.className = 'job_icon';
        job_icon.src = './images/job.png';


        let company = document.createElement('div');
        company.className = 'accepted__row';
        company.appendChild(company_icon);

        let job = document.createElement('div');
        job.className = 'accepted__row';
        job.appendChild(job_icon);

        let job_name = document.createElement('p');
        job_name.innerHTML = this.accepted.position;
        job_name.className = 'text text__cuerpo text__cuerpo--list';
        job.appendChild(job_name);

        let company_name = document.createElement('p');
        company_name.innerHTML = this.accepted.company;
        company_name.className = 'text text__cuerpo text__cuerpo--list';
        company.appendChild(company_name);

        let email_text = document.createElement('p');
        email_text.innerHTML = this.accepted.email
        email_text.className = 'text text__cuerpo text__cuerpo--list';
        email.appendChild(email_text);

        let deleteButton = document.createElement('button');
        deleteButton.className = 'button button--red button__delete';
        deleteButton.innerHTML = 'Eliminar';



        deleteButton.addEventListener('click', () => {
            database.ref('accepted/' + this.accepted.id).set(null);
            this.accepted.accepted = false;
            database.ref('users/' + this.accepted.id).set(this.accepted);
        });

        right.appendChild(email);
        right.appendChild(company);
        right.appendChild(job);
        right.appendChild(deleteButton);

        return component;

    }
}