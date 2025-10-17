let nomeAluno = "";
let score = 0;
let questaoAtual = 0;
const questoes = [
    // 5 questões de Português
    { pergunta: "Qual é o sujeito da frase: 'Maria foi à escola.'?", alternativas: ["Maria", "Foi", "Escola", "A"] , correta: 0 },
    { pergunta: "Qual é o plural de 'cão'?", alternativas: ["cães", "cãoes", "caos", "cãos"], correta: 0 },
    { pergunta: "Como se escreve o plural de 'pão'?", alternativas: ["pãos", "pães", "paos", "paes"], correta: 1 },
    { pergunta: "Qual a forma correta: 'a gente vai' ou 'a gente vão'?", alternativas: ["a gente vai", "a gente vão", "gente vai", "gente vão"], correta: 0 },
    { pergunta: "Qual é a frase correta?", alternativas: ["Ele foi à escola", "Ele foi a escola", "Ele foi na escola", "Ele vai para escola"], correta: 0 },

    // 5 questões de Matemática
    { pergunta: "Qual é o resultado de 5 + 7?", alternativas: ["10", "12", "14", "15"], correta: 1 },
    { pergunta: "Quanto é 9 x 8?", alternativas: ["72", "75", "80", "60"], correta: 0 },
    { pergunta: "Quanto é 100 ÷ 5?", alternativas: ["20", "25", "30", "50"], correta: 0 },
    { pergunta: "Qual é o resultado de 15 - 8?", alternativas: ["7", "8", "6", "5"], correta: 2 },
    { pergunta: "Quanto é 3²?", alternativas: ["9", "6", "8", "12"], correta: 0 }
];

const rankings = JSON.parse(localStorage.getItem('ranking')) || [];

function iniciarQuiz() {
    nomeAluno = document.getElementById('nome').value;
    if (!nomeAluno) {
        alert("Por favor, insira seu nome!");
        return;
    }
    document.getElementById('inicio').style.display = "none";
    document.getElementById('quiz').style.display = "block";
    document.getElementById('bgMusic').play();
    mostrarQuestao();
}

function mostrarQuestao() {
    const questao = questoes[questaoAtual];
    document.getElementById('pergunta').textContent = questao.pergunta;
    const alternativas = document.querySelectorAll('.alternativa');
    for (let i = 0; i < alternativas.length; i++) {
        alternativas[i].textContent = questao.alternativas[i];
    }
    document.getElementById('feedback').style.display = "none";
    document.getElementById('proxima').style.display = "none";
}

function verificarResposta(respostaEscolhida) {
    const questao = questoes[questaoAtual];
    const feedback = document.getElementById('feedback');
    if (respostaEscolhida === questao.correta) {
        feedback.textContent = "Você acertou!";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.textContent = "Você errou!";
        feedback.style.color = "red";
    }
    feedback.style.display = "block";
    document.getElementById('proxima').style.display = "inline-block";
}

function proximaQuestao() {
    questaoAtual++;
    if (questaoAtual < questoes.length) {
        mostrarQuestao();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    document.getElementById('quiz').style.display = "none";
    rankings.push({ nome: nomeAluno, score });
    localStorage.setItem('ranking', JSON.stringify(rankings));
    mostrarRanking();
}

function mostrarRanking() {
    rankings.sort((a, b) => b.score - a.score);
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = "";
    rankings.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${item.nome} - ${item.score} pontos`;
        rankingList.appendChild(li);
    });
    document.getElementById('ranking').style.display = "block";
}
