import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
// import category from '../pages/Category.css';
// import img1 from '../images/logo.png' ;


const categories = [
  { title: "Agriculture", imgSrc: "src/images/2",description: "Scholarships, infrastructure development, and more.", link: "/agriculture" },
  { title: "Education", imgSrc: "https://via.placeholder.com/150", description: "Scholarships, infrastructure development, and more.", link: "/education" },
  { title: "Health", imgSrc: "https://via.placeholder.com/150", description: "Health insurance, vaccination programs, and public health initiatives.", link: "/health" },
  { title: "Women and Child Welfare", imgSrc: "https://via.placeholder.com/150", description: "Programs for women empowerment and child protection.", link: "/women-child-welfare" },
  { title: "Employment and Skill Development", imgSrc: "https://via.placeholder.com/150", description: "Employment schemes, vocational training, and skill development.", link: "/employment-skill-development" },
  { title: "Social Welfare", imgSrc: "https://via.placeholder.com/150", description: "Pension schemes, financial assistance for the poor, and housing schemes.", link: "/social-welfare" },
  { title: "Rural Development", imgSrc: "https://via.placeholder.com/150", description: "Infrastructure, sanitation, and livelihood programs for rural areas.", link: "/rural-development" },
  { title: "Environment and Climate Change", imgSrc: "https://via.placeholder.com/150", description: "Programs for afforestation, clean energy, and climate resilience.", link: "/environment-climate-change" },
  { title: "Infrastructure Development", imgSrc: "https://via.placeholder.com/150", description: "Urban development, transportation, and housing projects.", link: "/infrastructure-development" },
  { title: "Science and Technology", imgSrc: "https://via.placeholder.com/150", description: "Research funding, technology parks, and space programs.", link: "/science-technology" },
  { title: "Culture and Heritage", imgSrc: "https://via.placeholder.com/150", description: "Preservation of heritage, support for arts, and tourism development.", link: "/culture-heritage" },
  { title: "Defense and Security", imgSrc: "https://via.placeholder.com/150", description: "Defense modernization, border infrastructure, and welfare programs.", link: "/defense-security" },
  { title: "Transportation", imgSrc: "https://via.placeholder.com/150", description: "Public transportation, road safety, and infrastructure development.", link: "/transportation" },
  { title: "Energy", imgSrc: "https://via.placeholder.com/150", description: "Renewable energy, efficiency programs, and rural electrification.", link: "/energy" },
  { title: "Financial Inclusion", imgSrc: "https://via.placeholder.com/150", description: "Microfinance, digital banking, and financial literacy programs.", link: "/financial-inclusion" },
  { title: "Disaster Management", imgSrc: "https://via.placeholder.com/150", description: "Disaster response, relief, and risk reduction programs.", link: "/disaster-management" }
];

const Category = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card" style={{ width: '17rem' }}>
              <img src={category.imgSrc} className="card-img-top" alt={category.title} height={200}/>
              <div className="card-body">
                <h5 className="card-title">{category.title}</h5>
                <p className="card-text">{category.description}</p>
                <a href={category.link} className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
