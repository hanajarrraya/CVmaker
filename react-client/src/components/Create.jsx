import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import axios from 'axios';
import { Cloudinary } from 'cloudinary-core';
var url = 'https://api.cloudinary.com/v1_1/drxdcalsl/upload'
var preset = 'cf3bvkos'
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
            _id: ""


        }

    }

    componentDidMount() {

        this.setState({ _id: this.props.id })

        axios.post('/api/cv/create', { _id: this.props.id }).then(({ data }) => {
            console.log('data in client in create=', data)
            this.setState({
                jobtitle: data[0].jobtitle,
                name: data[0].name,
                email: data[0].email,
                imageUrl: data[0].imageUrl,
                education: data[0].education,
                experience: data[0].experience,
                skills: data[0].skills,
                languages: data[0].languages,
                interests: data[0].interests
            })
            var output = document.getElementById('output_image');
            output.src = data[0].imageUrl;
            console.log('state in client in create=', this.state)
        })

    }
    handleChangeTitle(e) {
        this.setState({ jobtitle: e.target.value })
        console.log("state:", this.state.jobtitle);
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
        this.setState({ experience: e.target.value })
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
        console.log("client create save fct imageUrl=", this.props.imageUrl);
        axios.put('/api/cv/save/' + this.props.id, {
            jobtitle: this.state.jobtitle, name: this.state.name,
            email: this.state.email,
            imageUrl: this.state.imageUrl,
            education: this.state.education,
            experience: this.state.experience,
            skills: this.state.skills,
            languages: this.state.languages,
            interests: this.state.interests
        })
            .then((data) => {
                console.log('data in client in save', data)

            }

            )
    }

    preview_image(e) {
        var reader = new FileReader();
        var tag;


        reader.onload = function () {
            var output = document.getElementById('output_image');
            output.src = reader.result;

        }

        reader.readAsDataURL(e.target.files[0]);
        var formData = new FormData()
        var file = e.target.files[0]
        formData.append('file', file)
        formData.append('upload_preset', preset)
        axios({
            url: url,
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formData
        }).then((res) => {
            console.log('answer for post request:', res.data.secure_url)
            this.setState({ imageUrl: res.data.secure_url })
            console.log("state imge:", this.state.imageUrl);
        })
            .catch((err) => {
                console.error(err)
            })


    }
    download() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        var source = $('#content')[0];

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        var specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        var margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }, margins
        );

    }
    parseEducation() {
        var splitted_paragraphs = []
        if (this.state.education) {
            if (this.state.education.includes('\n')) {
                var paragraphs = this.state.education.split('\n')
                paragraphs.map((item, i) => splitted_paragraphs.push(<p key={i}>{item}</p>))
                return splitted_paragraphs;
            } else { return this.state.education }

        } else return this.state.education

    }
    parseExperiences() {
        var splitted_paragraphs = []
        if (this.state.experience) {
            if (this.state.experience.includes('\n')) {
                var paragraphs = this.state.experience.split('\n')
                paragraphs.map((item, i) => splitted_paragraphs.push(<p key={i}>{item}</p>))
                return splitted_paragraphs;
            } else { return this.state.experience }
        } else { return this.state.experience }
    }

    render() {

        return (<div className="create">
            <div className="create-editor">
                <h2>Write</h2>
                <div>

                    <p><input type="file" accept="image/*" onChange={this.preview_image.bind(this)} /></p>
                    <label>Profile:</label>
                    <input className="create-input" type="text" placeholder={this.state.jobtitle} onChange={this.handleChangeTitle.bind(this)}></input>
                    <label>Name:</label>
                    <input className="create-input" type="text" placeholder={this.state.name} onChange={this.handleChangeName.bind(this)}></input>
                    <label>Email:</label>
                    <input className="create-input" type="text" placeholder={this.state.email} onChange={this.handleChangeEmail.bind(this)}></input>
                    <label>Education:</label>
                    <textarea className="create-body-textarea" placeholder={this.state.education} onChange={this.handleChangeEducation.bind(this)}></textarea>
                    <label>Experiences:</label>
                    <textarea className="create-body-textarea" placeholder={this.state.experience} onChange={this.handleChangeExperiences.bind(this)}></textarea>
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
                    <label><b>Profile:</b></label>
                    <text className="view-input" type="text"  >{this.state.jobtitle}</text>
                    <label><b>Name:</b></label>
                    <text className="view-input" type="text"  >{this.state.name}</text>
                    <label><b>Email:</b></label>
                    <text className="view-input" type="text"  >{this.state.email}</text>
                    <label><b>Education:</b></label>
                    <text className="view-body-textarea"  >{this.parseEducation()}</text>
                    <label><b>Experiences:</b></label>
                    <text className="view-body-textarea"  >{this.parseExperiences()}</text>
                    <label><b>Skills:</b></label>
                    <text className="view-input" type="text"  >{this.state.skills}</text>
                    <label><b>Languages:</b></label>
                    <text className="view-input" type="text"  >{this.state.languages}</text>
                    <label><b>Interests:</b></label>
                    <text className="view-input" type="text"  >{this.state.interests}</text>

                </div>
                <div><button className="create-download-button" onClick={() => { this.download() }}>Download</button></div>
            </div>
        </div>)
    }

}

export default Create;
