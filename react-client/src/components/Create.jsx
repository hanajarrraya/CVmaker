import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import axios from 'axios';
class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobtitle: "",
            name: "",
            email: "",
            imageUrl: "",
            education: "",
            experience: "",
            skills: "",
            languages: "",
            interests: "",
            _id:""
            

        }

    }
    // getId(){
    //     var a=JSON.parse(localStorage.getItem('_id'))
    //     console.log('id in create:', a)
    //     this.setState({ _id: "60f1bd4819397546d4847579"})
    //     console.log('id in create from state:',this.state._id)
    // }
    componentDidMount() {
        // this.getId()
        this.setState({ _id: this.props.id})
        console.log('id in create from state:',this.state._id)
        axios.post('/api/cv/create', { _id: this.props.id}).then(({ data }) => {
             console.log('data in client in create=', data)
            this.setState({ jobtitle: data[0].jobtitle, name: data[0].name,
            email: data[0].email,
            imageUrl: data[0].imageUrl,
            education: data[0].education,
            experience: data[0].experience,
            skills: data[0].skills,
            languages: data[0].languages,
            interests:data[0].interests })

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
        console.log("client create save fct id=",this.props.id);
        axios.put('/api/cv/save/'+this.props.id,{jobtitle: this.state.jobtitle , name: this.state.name,
            email: this.state.email,
            imageUrl: this.state.imageUrl,
            education: this.state.education,
            experience: this.state.experience,
            skills: this.state.skills,
            languages: this.state.languages,
            interests:this.state.interests})
            .then((data) => {
                console.log('data in client in save', data)

            }

            )
    }

    preview_image(e) {
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('output_image');
            output.src = reader.result;

        }
        reader.readAsDataURL(e.target.files[0]);
        this.setState({imageUrl:e.target.files[0]})
    }
    download() {
        var doc = new jsPDF();
        var elementHTML = $('#content').html();
        var specialElementHandlers = {
            '#elementH': function (element, renderer) {
                return true;
            }
        };
        console.log('doc to pdf:',elementHTML);
        doc.fromHTML(elementHTML, 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });

        // Save the PDF
        // doc.save('sample-document.pdf');
        setTimeout(function () {
            doc.save(`fileName`);
        }, 0);  
        // doc.fromHTML(elementHTML, 0, 0, {
        //     'width': 100, // max width of content on PDF
        //     'elementHandlers': specialElementHandlers
        // },
        // function(bla){doc.save('saveInCallback.pdf');},
        // margin);

    }

    render() {

        return (<div className="create">
            <div className="create-editor">
                <h2>Write</h2>
                <div>

                    <p><input type="file" accept="image/*" onChange={this.preview_image.bind(this)} /></p>
                    <label>Job title:</label>
                    <input className="create-input" type="text" placeholder={this.state.jobtitle} onChange={this.handleChangeTitle.bind(this)}></input>
                    <label>Name:</label>
                    <input className="create-input" type="text" placeholder={this.state.name} onChange={this.handleChangeName.bind(this)}></input>
                    <label>Email:</label>
                    <input className="create-input" type="text" placeholder={this.state.email} onChange={this.handleChangeEmail.bind(this)}></input>
                    <label>Education:</label>
                    <textarea className="create-body-textarea" placeholder={this.state.education} onChange={this.handleChangeEducation.bind(this)}></textarea>
                    <label>Experiences:</label>
                    <textarea className="create-body-textarea" placeholder={this.state.experiences} onChange={this.handleChangeExperiences.bind(this)}></textarea>
                    <label>Skills:</label>
                    <input className="create-input" type="text" placeholder={this.state.skills} onChange={this.handleChangeSkills.bind(this)}></input>
                    <label>Languages:</label>
                    <input className="create-input" type="text" placeholder={this.state.languages} onChange={this.handleChangeLanguages.bind(this)}></input>
                    <label>Interests:</label>
                    <input className="create-input" type="text" placeholder={this.state.interests} onChange={this.handleChangeInterests.bind(this)}></input>
                    <button className="create-submit-button" type="submit" onClick={() => { this.save() }}>Save</button>
                </div>
            </div>
            <div className="create-preview " >
                <h2>VIEW</h2>
                <div id="content">
                    <img id="output_image" className="create-preview-image" />
                    <text className="view-input" type="text"  >{this.state.jobtitle}</text>
                    <text className="view-input" type="text"  >{this.state.name}</text>
                    <text className="view-input" type="text"  >{this.state.email}</text>

                    <text className="view-body-textarea"  >{this.state.education}</text>
                    <text className="view-body-textarea"  >{this.state.experiences}</text>
                    <text className="view-input" type="text"  >{this.state.skills}</text>
                    <text className="view-input" type="text"  >{this.state.languages}</text>
                    <text className="view-input" type="text"  >{this.state.interests}</text>
                    <button className="create-download-button" onClick={() => { this.download() }}>Download</button>
                </div>
            </div>
        </div>)
    }

}

export default Create;
