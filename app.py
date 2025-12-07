from flask import Flask, render_template
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# Resume download route (serves the PDF in static)
@app.route('/resume')
def resume():
    return send_from_directory(directory=os.path.join(app.root_path, 'static'),path='Tanmayi_resume.pdf', as_attachment=True)

if __name__ == "__main__":
       app.run(debug=True)
