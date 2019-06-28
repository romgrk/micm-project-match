import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RoundedButton from 'Src/modules/RoundedButton';
import InputField from 'Src/modules/InputField';
import TextArea from 'Src/modules/TextArea';
import Checkbox from 'Src/modules/Checkbox';
import './createProjectForm.scss';
import { axis, organizations } from 'Src/config/data';

const createProjectValidate = values => {
  const errors = {};
  if (!values.title) errors.title = 'Required';
  if (!values.startDate) errors.startDate = 'Required';
  if (!values.abstract) errors.abstract = 'Required';
  if (!values.description) errors.description = 'Required';
  if (!values.datasets) errors.datasets = 'Required';
  if (!values.motive) errors.motive = 'Required';
  return errors;
};

let CreateProjectCheckbox = ({ input: { onChange, ...input }, ...rest }) => (
  <Checkbox
    {...input}
    {...rest}
    onChange={value => onChange(value)}
    type="checkbox"
  />
);

CreateProjectCheckbox.propTypes = {
  input: PropTypes.object.isRequired
};

let CreateProjectSelect = ({ input, meta: { touched, error } }) => (
  <div className={`create-project-field ${error && touched ? 'error' : ''}`}>
    <input {...input} type="select" />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

CreateProjectSelect.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

let CreateProjectTextArea = ({
  input,
  height,
  label,
  meta: { touched, error }
}) => (
  <div
    style={{ height: height || 150 }}
    className={`create-project-text-area ${error && touched ? 'error' : ''}`}
  >
    <TextArea {...input} placeholder={label} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

CreateProjectTextArea.propTypes = {
  height: PropTypes.number,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

let CreateProjectField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`create-project-field ${error && touched ? 'error' : ''}`}>
    <InputField {...input} placeholder={label} type={type} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

CreateProjectField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

class CreateProjectFormComponent extends Component {
  render() {
    const props = this.props;
    return (
      <div className="create-project-form">
        <div className="form">
          <form
            onSubmit={props.handleSubmit(data =>
              props.onCreateProject({ data, push: props.history.push })
            )}
          >
            <div>
              Project Title
              <Field name="title" component={CreateProjectField} type="text" />
            </div>
            <div className="row">
              <div className="half-width">
                Prefered project start date
                <Field
                  name="startDate"
                  component={CreateProjectField}
                  type="date"
                />
              </div>
              <div className="half-width">
                MiCM Axis
                <Field name="axis" component="select">
                  <option hidden>Click here to select</option>
                  {axis.map((axis, i) => (
                    <option key={`axis_${i}`} value={axis}>
                      {axis}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
            <div>
              High level abstract
              <Field name="abstract" component={CreateProjectTextArea} />
            </div>
            <div>
              Project description
              <Field
                height={300}
                name="description"
                component={CreateProjectTextArea}
              />
            </div>
            <div>
              Description of datasets to be used or generated (collaborations
              for study design are also encouraged)
              <Field name="datasets" component={CreateProjectTextArea} />
            </div>
            <div>
              Explain why you see this as a collaborative research project and
              what you hope to gain from the collaboration. Highlight any
              potential of the proposed work to progress to other funding
              competition.
              <Field name="motive" component={CreateProjectTextArea} />
            </div>
            <div>
              Relevant to the following organization/initiatives (Select all
              that apply)
              <div className="checkbox-group">
                {organizations.map((organization, i) => (
                  <div className="checkbox-container" key={`organization_${i}`}>
                    <Field
                      name={organization}
                      component={CreateProjectCheckbox}
                      text={organization}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="half-width">
                Expected project timeframe
                <Field name="timeframe" component="select">
                  <option hidden>Click here to select</option>
                  <option value={'3 - 4 Months'}>3 - 4 Months</option>
                  <option value={'6 - 12 Months'}>6 - 12 Months</option>
                </Field>
              </div>
              <div />
              <div className="half-width">
                Can students apply for this project?
                <div>
                  <Field name="openForStudents" component="select">
                    <option hidden>Click here to select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Field>
                </div>
              </div>
            </div>
            <div className="right-button">
              <RoundedButton>Create Project</RoundedButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateProjectFormComponent.propTypes = {
  initialize: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onCreateProject: PropTypes.func.isRequired
};

const CreateProjectForm = reduxForm({
  form: 'createProject',
  validate: createProjectValidate
})(CreateProjectFormComponent);

export default withRouter(CreateProjectForm);
