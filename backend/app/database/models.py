"""
SQLAlchemy ORM models for SkillTwin AI:
Users, Profiles, Skills, Projects, SkillGaps, RoadmapTasks, ProjectRecommendations.
"""
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.app.database.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    skills = relationship("Skill", back_populates="user", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")
    skill_gaps = relationship("SkillGap", back_populates="user", cascade="all, delete-orphan")
    roadmap_tasks = relationship("RoadmapTask", back_populates="user", cascade="all, delete-orphan")
    project_recommendations = relationship("ProjectRecommendation", back_populates="user", cascade="all, delete-orphan")
    skill_evolutions = relationship("SkillEvolution", back_populates="user", cascade="all, delete-orphan")


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True, index=True)
    education = Column(String, nullable=True)
    status = Column(String, nullable=True)
    experience_years = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    target_role = Column(String, nullable=False)
    weekly_hours = Column(Integer, default=10)
    target_timeline_months = Column(Integer, default=3)
    preferred_industry = Column(String, nullable=True)
    preferred_location = Column(String, nullable=True)
    alignment_score = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profile")


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    name = Column(String, nullable=False)
    category = Column(String, default="General")
    self_level = Column(String, default="Beginner")
    verified_level = Column(String, default="Beginner")
    confidence = Column(Float, default=0.5)
    learning_source = Column(String, nullable=True)
    evidence_json = Column(Text, nullable=True)  # JSON array string

    user = relationship("User", back_populates="skills")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    technologies = Column(String, nullable=False)
    role = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    user_contribution = Column(Text, nullable=True)

    user = relationship("User", back_populates="projects")


class SkillGap(Base):
    __tablename__ = "skill_gaps"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    skill_name = Column(String, nullable=False)
    category = Column(String, default="General")
    current_level = Column(String, default="None")
    required_level = Column(String, default="Intermediate")
    gap_level = Column(String, default="High")  # High, Medium, Low, None
    priority = Column(String, default="MEDIUM")  # HIGH, MEDIUM, LOW, STRONG
    reason = Column(Text, nullable=True)

    user = relationship("User", back_populates="skill_gaps")


class RoadmapTask(Base):
    __tablename__ = "roadmap_tasks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    phase_number = Column(Integer, default=1)
    phase_name = Column(String, nullable=False)
    week_label = Column(String, nullable=False)
    skill_name = Column(String, nullable=False)
    why_it_matters = Column(Text, nullable=True)
    learning_objective = Column(Text, nullable=False)
    suggested_task = Column(Text, nullable=False)
    practical_exercise = Column(Text, nullable=False)
    estimated_hours = Column(Integer, default=10)
    completion_criteria = Column(Text, nullable=True)
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="roadmap_tasks")


class ProjectRecommendation(Base):
    __tablename__ = "project_recommendations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    title = Column(String, nullable=False)
    problem = Column(Text, nullable=False)
    skills_developed = Column(String, nullable=False)  # comma separated
    difficulty = Column(String, default="Intermediate")
    estimated_duration = Column(String, default="1-2 weeks")
    expected_outcome = Column(Text, nullable=False)
    why_matches_gaps = Column(Text, nullable=False)
    is_added_to_roadmap = Column(Boolean, default=False)

    user = relationship("User", back_populates="project_recommendations")


class SkillEvolution(Base):
    __tablename__ = "skill_evolutions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    trigger_event = Column(String, nullable=False)  # e.g., "Completed Roadmap Task: Docker Setup"
    skill_name = Column(String, nullable=False)
    previous_level = Column(String, nullable=False)
    new_level = Column(String, nullable=False)
    previous_confidence = Column(Float, default=0.5)
    new_confidence = Column(Float, default=0.7)
    unlocked_capabilities = Column(Text, nullable=True)  # JSON or comma-separated list
    remaining_gaps_count = Column(Integer, default=0)
    alignment_score_after = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="skill_evolutions")
