class Request {
    constructor(request, counter) {
        this.request = request;
        this.counter = counter;
    }

    render = () => {

        let uppercontainer = document.createElement('div');
        uppercontainer.className = 'request__uppercontainer';


        let component = document.createElement('article');
        component.className = 'request';

        let sepline = document.createElement('div');
        sepline.className = 'request__sepline';
        if (this.counter != 0) {
            uppercontainer.appendChild(sepline);
        }

        let info = document.createElement('div');
        info.className = "request__info";
        component.appendChild(info);

        let name = document.createElement('p');
        name.innerHTML = '' + this.request.name + ' ' + this.request.lastName;
        name.className = 'text text__subheading';
        info.appendChild(name);

        let email = document.createElement('p');
        email.innerHTML = '' + this.request.email;
        email.className = 'text text__cuerpo';
        info.appendChild(email);

        let buttons = document.createElement('div');
        buttons.className = 'request__buttons';
        component.appendChild(buttons);

        let acceptButton = document.createElement('button');
        acceptButton.className = 'button button--accept button--green';
        acceptButton.innerHTML = 'Aceptar';
        buttons.appendChild(acceptButton);

        let deniedButton = document.createElement('button');
        deniedButton.className = 'button button--accept button--red';
        deniedButton.innerHTML = 'Rechazar';
        buttons.appendChild(deniedButton);

        let seeMore = document.createElement('a');
        seeMore.className = 'header__link header__link--seemore';
        seeMore.innerHTML = 'Ver más';
        buttons.appendChild(seeMore);

        uppercontainer.appendChild(info);
        uppercontainer.appendChild(buttons);
        component.appendChild(uppercontainer);

        let downcontainer = document.createElement('div');
        downcontainer.className = 'request__downcontainer';


        let company = document.createElement('div');
        company.className = 'request__company';
        downcontainer.appendChild(company);

        let job = document.createElement('div');
        job.className = 'request__job';
        downcontainer.appendChild(job);

        let company_icon = document.createElement('img');
        company_icon.className = 'company_icon';
        company_icon.src = './images/company.png';
        company.appendChild(company_icon);

        let company_name = document.createElement('p');
        company_name.innerHTML = this.request.company;
        company_name.className = 'text text__cuerpo text__cuerpo--list';
        company.appendChild(company_name);

        let job_icon = document.createElement('img');
        job_icon.className = 'job_icon';
        job_icon.src = './images/job.png';
        job.appendChild(job_icon);

        let job_name = document.createElement('p');
        job_name.innerHTML = this.request.position;
        job_name.className = 'text text__cuerpo text__cuerpo--list';

        job.appendChild(job_name);

        let hide = document.createElement('a');
        hide.innerHTML = 'Ocultar';
        hide.className = 'header__link header__link--hide';
        downcontainer.appendChild(hide);

        let date = document.createElement('p');
        date.className = 'header__link header__link--date';
        date.innerHTML = '' + this.request.requestDate;
        downcontainer.appendChild(date);

        seeMore.addEventListener('click', () => {
            downcontainer.style.display = 'flex';
            downcontainer.style.flexDirection = 'column';
            seeMore.style.display = 'none';

        });

        hide.addEventListener('click', () => {
            downcontainer.style.display = 'none';
            seeMore.style.display = 'flex';
        });

        deniedButton.addEventListener('click', () => {

            database.ref('pending/' + this.request.id).set(null);
        });

        acceptButton.addEventListener('click', () => {
            this.request.accepted = true;


            var templateParams = {
                to_name: this.request.name,
                to_address: this.request.email
            }

            console.log(templateParams);
            emailjs.send('service_6ozacbe', 'template_2c0tncb', templateParams);





            database.ref('accepted/' + this.request.id).set(this.request);
            database.ref('pending/' + this.request.id).set(null);
            database.ref('users/' + this.request.id).set(this.request);

        });

        component.appendChild(downcontainer);

        return component;

    }

}