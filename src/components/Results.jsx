// src/components/Results.jsx
import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';
import questions from '../data/questions';

// Couleurs par dimension
const dimensionColors = {
  "COMPETENCES LIEES A LA CONNAISSANCE DE SOI ET A L’ORGANISATION": "#FEB746",
  "COMPETENCES « COGNITIVES » ET METHODOLOGIQUES": "#63DAF1",
  "COMPETENCES RELATIONNELLES ET SOCIALES": "#68DB54"
};

// Formattage des labels trop longs
const formatLabel = text =>
  text.length > 20 ? text.replace(/ /g, '\n') : text;

// Texte global
const globalExplanation = (
  <>
    <p>
      Le graphique ci-dessous présente vos résultats sur les trois grandes dimensions évaluées dans ce test. Chaque sommet du triangle correspond à l’une de ces dimensions.
      <span style={{ fontWeight: 900, color: '#5B3C8B' }}>
        Plus la zone colorée s’étend vers un sommet, plus votre score dans cette dimension est élevé.
      </span>
    </p>
    <p>
      <span style={{ fontWeight: 900, color: '#5B3C8B' }}>
        Ces « résultats » ne figent rien mais précisent plutôt une tendance, une « photographie » de ce que sont vos « soft skills » à un instant donné.
      </span>
    </p>
    <p>
      Il permet d’identifier ce qui peut être développé ou renforcé, tout en mettant en lumière des ressources déjà présentes, que vous pouvez reconnaître, valoriser et mobiliser dans vos parcours à venir.
    </p>
  </>
);

// Textes par dimension
const dimensionTexts = {
  "COMPETENCES LIEES A LA CONNAISSANCE DE SOI ET A L’ORGANISATION": (
    <>
      <span style={{ fontWeight: 900, color: '#5B3C8B' }}>
        VOS RÉSULTATS – CONNAISSANCE DE SOI ET ORGANISATION
      </span>
      <p>
        Ce graphique détaille vos scores pour chacune des compétences qui composent cette dimension : gestion du temps, autonomie, concentration, capacité à apprendre et confiance en soi. Chaque axe représente une compétence spécifique. Plus la zone colorée s’étend vers l’extérieur, plus votre score est élevé sur cette compétence.
      </p>
      <p>
        Ces résultats vous donnent une vue d’ensemble de vos points forts actuels et des aspects que vous pouvez choisir de développer. Il ne s’agit pas d’une évaluation définitive, mais d’un outil de lecture personnelle. Ce radar met en évidence des ressources sur lesquelles vous pouvez vous appuyer, tout en suggérant des pistes de progression à explorer selon vos besoins et vos priorités.
      </p>
    </>
  ),
  "COMPETENCES « COGNITIVES » ET METHODOLOGIQUES": (
    <>
      <span style={{ fontWeight: 900, color: '#5B3C8B' }}>
        VOS RÉSULTATS – COMPÉTENCES COGNITIVES ET MÉTHODOLOGIQUES
      </span>
      <p>
        Ce radar présente vos niveaux sur les compétences qui structurent votre manière de réfléchir, d’analyser et de résoudre des problèmes. Il s’appuie sur plusieurs axes : esprit critique, créativité, analyse, synthèse, gestion de l’information, résolution de problèmes. La forme du graphique reflète votre profil actuel sur ces différentes facettes.
      </p>
      <p>
        Ces données vous offrent un éclairage sur vos habitudes de pensée et vos modes de traitement de l’information. Elles vous invitent à reconnaître vos atouts, souvent sous-estimés, tout en vous proposant des pistes concrètes pour continuer à affiner votre approche. L’objectif n’est pas d’évaluer ce que vous « êtes », mais de vous aider à construire ce que vous pouvez devenir.
      </p>
    </>
  ),
  "COMPETENCES RELATIONNELLES ET SOCIALES": (
    <>
      <span style={{ fontWeight: 900, color: '#5B3C8B' }}>
        VOS RÉSULTATS – COMPÉTENCES RELATIONNELLES ET SOCIALES
      </span>
      <p>
        Ce graphique illustre comment vous vous situez sur des compétences clés dans vos interactions avec les autres : communication orale et écrite, écoute active, empathie, travail en équipe. Chaque compétence est représentée par un axe, permettant une lecture fine et personnalisée.
      </p>
      <p>
        Les résultats obtenus mettent en lumière votre manière d’entrer en relation, de coopérer, de vous exprimer. Ils révèlent des aspects déjà bien développés, qu’il est utile de reconnaître et de valoriser, mais aussi des dimensions à travailler pour gagner en aisance ou en impact. Ce radar est un outil d’exploration, pas de mesure définitive : il vous accompagne dans une dynamique d’évolution continue.
      </p>
    </>
  )
};

// Tooltip et ticks (inchangés)
const CustomTooltip = ({ active, payload, radarTitle, color }) => {
  if (active && payload?.length) {
    const score = payload[0].value;
    const name = payload[0].payload.fullName || payload[0].payload.name;
    return (
      <div style={{
        backgroundColor: '#fff',
        padding: '0.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontFamily: "'Quicksand', sans-serif",
        fontSize: '0.85rem'
      }}>
        <strong>{radarTitle}</strong><br/>
        <span style={{ color }}>{name} : {score}%</span>
      </div>
    );
  }
  return null;
};

const CustomAngleAxisTick = ({ payload, x, y, textAnchor, fill }) => {
  const words = payload.value.split(/\s+/);
  const lines = [];
  let line = words.shift();
  words.forEach(w => {
    if ((line + ' ' + w).length > 20) {
      lines.push(line);
      line = w;
    } else {
      line += ' ' + w;
    }
  });
  lines.push(line);
  return (
    <text x={x} y={y} textAnchor={textAnchor} fill={fill} fontSize={11}>
      {lines.map((l, i) => (
        <tspan x={x} dy={i === 0 ? 0 : 15} key={i}>{l}</tspan>
      ))}
    </text>
  );
};

// Box explicative
const ExplanationBox = ({ children }) => (
  <div style={{
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    padding: '1rem',
    margin: '1rem auto 6rem auto',
    maxWidth: '720px',
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '0.95rem',
    textAlign: 'justify',
    color: '#333'
  }}>
    {children}
  </div>
);

// Générateur de section (radar + explication + saut de page)
const renderRadar = (title, data, color, isGlobal = false) => (
  <div
    key={title}
    style={{
      width: '100%',
      maxWidth: 800,
      margin: '2rem auto',
      pageBreakAfter: 'always',
      breakAfter: 'page'
    }}
  >
    <h3 style={{
      textAlign: 'center',
      color: '#5B3C8B',
      fontFamily: "'Quicksand', sans-serif",
      textTransform: isGlobal ? 'uppercase' : 'none'
    }}>
      {title}
    </h3>

    <ResponsiveContainer width="100%" height={400}>
      <RadarChart outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="name"
          tick={<CustomAngleAxisTick fill="#333" />}
          radius="90%"
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tickCount={6}
          formatter={v => `${v}%`}
        />
        <Tooltip content={<CustomTooltip radarTitle={title} color={color} />} />
        <Radar
          name={title}
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.6}
          // Rendu permanent des labels %
          label={({ cx, cy, value, angle }) => {
            const r = isGlobal ? 90 : 130;
            const rad = (Math.PI / 180) * angle;
            return (
              <text
                x={cx + r * Math.cos(-rad)}
                y={cy + r * Math.sin(-rad)}
                fill="#333"
                fontSize={11}
                textAnchor="middle"
              >
                {value}%
              </text>
            );
          }}
        />
      </RadarChart>
    </ResponsiveContainer>

    <ExplanationBox>
      {isGlobal
        ? globalExplanation
        : (dimensionTexts[title] || <>Texte explicatif pour la dimension « {title} ».</>)
      }
    </ExplanationBox>
  </div>
);

export default function Results({ results }) {
  const handlePrint = () => window.print();

  if (
    !results ||
    !results.dimensions ||
    !results.details ||
    Object.keys(results.dimensions).length === 0
  ) {
    return <p style={{ textAlign: 'center' }}>Aucun résultat à afficher.</p>;
  }

  // Comptages pour %
  const countByDimension = {};
  const countBySkill = {};
  questions.forEach(q => {
    countByDimension[q.dimension] = (countByDimension[q.dimension]||0) + 1;
    countBySkill[q.dimension] = countBySkill[q.dimension]||{};
    countBySkill[q.dimension][q.skill] = (countBySkill[q.dimension][q.skill]||0) + 1;
  });
  const MAX_PER_Q = 10;

  // Données globales
  const globalData = Object.entries(results.dimensions).map(([dim, rawPts]) => {
    const maxPts = (countByDimension[dim]||0) * MAX_PER_Q;
    const pct = maxPts ? Math.round((rawPts/maxPts)*100) : 0;
    return { name: formatLabel(dim), value: pct, fullName: `${dim} (${pct}%)` };
  });

  // Radars détaillés
  const detailRadars = Object.entries(results.details).map(([dim, skills]) => {
    const data = Object.entries(skills).map(([skill, rawPts]) => {
      const nbQ = countBySkill[dim]?.[skill]||0;
      const pct = nbQ ? Math.round((rawPts/(nbQ*MAX_PER_Q))*100) : 0;
      return { name: formatLabel(skill), value: pct, fullName: `${skill} (${pct}%)` };
    });
    return renderRadar(dim, data, dimensionColors[dim]||'#999', false);
  });

  return (
    <div>
      <div id="print-area" style={{ padding: '2rem' }}>
        {renderRadar("Score global par dimension", globalData, "#5B3C8B", true)}
        {detailRadars}
      </div>

      <button
        onClick={handlePrint}
        style={{
          margin: '2rem auto',
          display: 'block',
          padding: '0.6rem 1rem',
          background: '#5B3C8B',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          fontFamily: "'Quicksand', sans-serif"
        }}
      >
        🖨️ Imprimer / PDF
      </button>
    </div>
  );
}
