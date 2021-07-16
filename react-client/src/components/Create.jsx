import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import axios from 'axios';
class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobtitle:"",
            name: "",
            email: "",
            imageUrl: "",
            education: "",
            experience: "",
            skills: "",
            languages: "",
            interests: "",
            

        }

    }
componentDidMount(){
    axios.get('/api/cv', {  }).then((data) => {
        console.log('data in client', data)
        this.setState({data:data})

    })
}
    handleChangeTitle(e) {
        this.setState({ jobtitle: e.target.value })
    }
    handleChangeName(e) {
        this.setState({ name: e.target.value })
    }
    handleChangeEmail(e) {
        this.setState({ email: e.target.value })
    }
    handleChangeimage(e) {
        this.setState({ imageUrl: e.target.value })
    }
    handleChangeEducation(e) {
        this.setState({ education: e.target.value })
        console.log("state:", this.state.education);
    }
    handleChangeExperiences(e) {
        this.setState({ experiences: e.target.value })
        console.log("state:", this.state.experiences);
    }
    handleChangeSkills(e) {
        this.setState({ skills: e.target.value })
    }
    handleChangeLanguages(e) {
        this.setState({ languages: e.target.value })
    }
    handleChangeInterests(e) {
        this.setState({ interests: e.target.value })
    }
    save() {
        // axios.put('/api/cv', {})
        //     .then((data) => {
        //         console.log('data in client', data)

        //     }

        //     )
    }

    preview_image(e) {
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('output_image');
            output.src = reader.result;

        }
        reader.readAsDataURL(e.target.files[0]);
    }
    download(){
        var doc = new jsPDF();
var elementHTML = $('#content').html();
var specialElementHandlers = {
    '#elementH': function (element, renderer) {
        return true;
    }
};
doc.fromHTML(elementHTML, 15, 15, {
    'width': 170,
    'elementHandlers': specialElementHandlers
});

// Save the PDF
doc.save('sample-document.pdf');

    }

    render() {

        return (<div className="create">
            <div className="create-editor">
                <h2>Write</h2>
                <form>

                    <input type="file" accept="image/*" onChange={this.preview_image.bind(this)} />
                    <label>Job title:</label>
                    <input className="create-input" type="text" placeholder="Job title" onChange={this.handleChangeTitle.bind(this)}></input>
                    <input className="create-input" type="text" placeholder="Name" onChange={this.handleChangeName.bind(this)}></input>
                    <input className="create-input" type="text" placeholder="Email" onChange={this.handleChangeEmail.bind(this)}></input>
                    <textarea className="create-body-textarea" placeholder="Education" onChange={this.handleChangeEducation.bind(this)}></textarea>
                    <textarea className="create-body-textarea" placeholder="Experiences" onChange={this.handleChangeExperiences.bind(this)}></textarea>
                    <input className="create-input" type="text" placeholder="Skills" onChange={this.handleChangeSkills.bind(this)}></input>
                    <input className="create-input" type="text" placeholder="Languages" onChange={this.handleChangeLanguages.bind(this)}></input>
                    <input className="create-input" type="text" placeholder="Interests" onChange={this.handleChangeInterests.bind(this)}></input>
                    <button className="create-submit-button" type="submit" onClick={() => { this.save() }}>Save</button>
                </form>
            </div>
            <div className="create-preview " id="content">
                <h2>VIEW</h2>
                <form>
                    <img id="output_image" className="create-preview-image" />
                    <text className="view-input" type="text"  >{this.state.jobtitle}</text>
                    <text className="view-input" type="text"  >{this.state.name}</text>
                    <text className="view-input" type="text"  >{this.state.email}</text>

                    <text className="view-body-textarea"  >{this.state.education}</text>
                    <text className="view-body-textarea"  >{this.state.experiences}</text>
                    <text className="view-input" type="text"  >{this.state.skills}</text>
                    <text className="view-input" type="text"  >{this.state.languages}</text>
                    <text className="view-input" type="text"  >{this.state.interests}</text>
                    <button className="create-download-button" type="submit" onClick={() => { this.download() }}>Download</button>
                </form>
            </div>
        </div>)
    }

}

export default Create;
