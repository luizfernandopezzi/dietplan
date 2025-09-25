import { useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Heart, Apple, Droplets, Activity, Moon, Calendar, User, Target, Clock, FileText, Download } from 'lucide-react'
import headerDesign from './assets/header_design.png'
import nutritionIcons from './assets/nutrition_icons.png'
import './App.css'

function App() {
  // Estado expandido para dados do cliente
  const [clientData, setClientData] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    idade: '',
    profissao: '',
    altura: '',
    pesoAtual: '',
    objetivosNutricionais: '',
    historicoSaude: '',
    nivelAtividadeFisica: '',
    preferenciasAlimentares: '',
    alimentosNaoConsome: '',
    rotinaDiaria: ''
  })

  // Estado para informações da nutricionista
  const [nutritionistInfo, setNutritionistInfo] = useState({
    nome: '',
    crn: '',
    telefone: '',
    email: '',
    redesSociais: ''
  })

  // Estado para progresso
  const [progressNotes, setProgressNotes] = useState([
    { semana: 1, desafios: '', conquistas: '', ajustes: '' },
    { semana: 2, desafios: '', conquistas: '', ajustes: '' }
  ])

  const [currentWeek, setCurrentWeek] = useState(1)

  const handleInputChange = (field, value) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNutritionistChange = (field, value) => {
    setNutritionistInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleProgressChange = (weekIndex, field, value) => {
    setProgressNotes(prev => 
      prev.map((note, index) => 
        index === weekIndex ? { ...note, [field]: value } : note
      )
    )
  }

  // Plano de refeições existente
  const mealPlan = {
    1: {
      'Segunda-feira': {
        'Café da Manhã': 'Ovos mexidos com vegetais + 1 fatia de pão integral + fruta',
        'Lanche Manhã': 'Fruta + punhado de castanhas',
        'Almoço': 'Proteína magra (frango/peixe) + arroz integral + legumes e verduras',
        'Lanche Tarde': 'Iogurte natural',
        'Jantar': 'Salada completa com leguminosas + proteína',
        'Ceia': 'Chá de camomila'
      },
      'Terça-feira': {
        'Café da Manhã': 'Iogurte natural com granola sem açúcar e frutas vermelhas',
        'Lanche Manhã': 'Cenouras baby com homus',
        'Almoço': 'Salmão grelhado + quinoa + brócolis refogado',
        'Lanche Tarde': 'Fruta + amêndoas',
        'Jantar': 'Sopa de legumes com frango desfiado',
        'Ceia': 'Fruta pequena'
      },
      'Quarta-feira': {
        'Café da Manhã': 'Vitamina de frutas com whey protein e aveia',
        'Lanche Manhã': 'Iogurte natural',
        'Almoço': 'Peito de frango + batata doce + salada verde',
        'Lanche Tarde': 'Mix de oleaginosas',
        'Jantar': 'Peixe assado + legumes no vapor',
        'Ceia': 'Chá relaxante'
      },
      'Quinta-feira': {
        'Café da Manhã': 'Tapioca com queijo branco + suco natural',
        'Lanche Manhã': 'Fruta da estação',
        'Almoço': 'Carne magra + arroz integral + feijão + salada',
        'Lanche Tarde': 'Iogurte com chia',
        'Jantar': 'Omelete de vegetais + salada',
        'Ceia': 'Leite morno'
      },
      'Sexta-feira': {
        'Café da Manhã': 'Panqueca de aveia com frutas',
        'Lanche Manhã': 'Castanhas do Brasil',
        'Almoço': 'Peixe grelhado + quinoa + vegetais refogados',
        'Lanche Tarde': 'Smoothie verde',
        'Jantar': 'Frango desfiado + salada completa',
        'Ceia': 'Chá de ervas'
      },
      'Sábado': {
        'Café da Manhã': 'Café da manhã especial (flexível)',
        'Lanche Manhã': 'Fruta + nozes',
        'Almoço': 'Refeição livre (com moderação)',
        'Lanche Tarde': 'Iogurte natural',
        'Jantar': 'Proteína + vegetais + carboidrato integral',
        'Ceia': 'Opcional'
      },
      'Domingo': {
        'Café da Manhã': 'Ovos + torrada integral + abacate',
        'Lanche Manhã': 'Fruta',
        'Almoço': 'Refeição em família (equilibrada)',
        'Lanche Tarde': 'Oleaginosas',
        'Jantar': 'Leve: sopa ou salada + proteína',
        'Ceia': 'Chá calmante'
      }
    }
  }

  const nutritionalTips = [
    {
      icon: <Apple className="w-5 h-5" />,
      title: "Frutas e Vegetais",
      description: "Consuma pelo menos 5 porções por dia para garantir vitaminas e fibras essenciais."
    },
    {
      icon: <Droplets className="w-5 h-5" />,
      title: "Hidratação",
      description: "Beba 8-10 copos de água por dia para manter o corpo funcionando adequadamente."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Gorduras Saudáveis",
      description: "Inclua abacate, nozes e azeite para o equilíbrio hormonal e saúde cardiovascular."
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: "Exercícios",
      description: "Combine alimentação saudável com atividade física regular para melhores resultados."
    },
    {
      icon: <Moon className="w-5 h-5" />,
      title: "Sono de Qualidade",
      description: "Durma 7-9 horas por noite para regular hormônios da fome e saciedade."
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Planejamento",
      description: "Dedique tempo semanal para planejar refeições e fazer compras conscientes."
    }
  ]

  const phaseNutrition = {
    "Adolescência (10-19 anos)": {
      focus: "Crescimento e desenvolvimento",
      nutrients: ["Cálcio", "Vitamina D", "Ferro", "Zinco", "Vitamina C", "Vitamina A", "Complexo B"],
      description: "Período de crescimento acelerado que requer aumento da necessidade energética e atenção especial aos micronutrientes."
    },
    "Fase Adulta (20-59 anos)": {
      focus: "Manutenção da saúde e prevenção",
      nutrients: ["Ácido Fólico", "Ferro", "Ômega-3", "Vitaminas A, C, E", "Probióticos"],
      description: "Foco na qualidade alimentar para saúde da pele, fertilidade e prevenção de doenças crônicas."
    },
    "Climatério/Pós-Menopausa (40+ anos)": {
      focus: "Prevenção de doenças crônicas",
      nutrients: ["Cálcio", "Vitamina D", "Vitamina B12", "Magnésio", "Fibras"],
      description: "Prevenção de osteoporose, doenças cardiovasculares e controle do peso corporal."
    }
  }

  // Função para gerar PDF
  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    
    // Configurações de estilo
    const primaryColor = '#4A7C59'
    const secondaryColor = '#7FB069'
    const textColor = '#2C3E50'
    
    let yPosition = 20
    
    // Cabeçalho
    pdf.setFillColor(74, 124, 89) // Verde principal
    pdf.rect(0, 0, pageWidth, 40, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Plano Alimentar Personalizado', pageWidth / 2, 25, { align: 'center' })
    
    yPosition = 50
    
    // Informações do Cliente
    pdf.setTextColor(textColor)
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Informações do Cliente', 20, yPosition)
    yPosition += 10
    
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    
    const clientFields = [
      { label: 'Nome Completo', value: clientData.nomeCompleto },
      { label: 'Data de Nascimento', value: clientData.dataNascimento },
      { label: 'Idade', value: clientData.idade },
      { label: 'Profissão', value: clientData.profissao },
      { label: 'Altura', value: clientData.altura + ' cm' },
      { label: 'Peso Atual', value: clientData.pesoAtual + ' kg' },
      { label: 'Objetivos', value: clientData.objetivosNutricionais },
      { label: 'Histórico de Saúde', value: clientData.historicoSaude },
      { label: 'Nível de Atividade', value: clientData.nivelAtividadeFisica },
      { label: 'Preferências Alimentares', value: clientData.preferenciasAlimentares }
    ]
    
    clientFields.forEach(field => {
      if (field.value) {
        pdf.setFont('helvetica', 'bold')
        pdf.text(field.label + ':', 20, yPosition)
        pdf.setFont('helvetica', 'normal')
        pdf.text(field.value, 70, yPosition)
        yPosition += 8
      }
    })
    
    // Nova página para o cardápio
    pdf.addPage()
    yPosition = 20
    
    // Cardápio Semanal
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Cardápio Semanal', 20, yPosition)
    yPosition += 15
    
    Object.entries(mealPlan[currentWeek]).forEach(([day, meals]) => {
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text(day, 20, yPosition)
      yPosition += 8
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      
      Object.entries(meals).forEach(([mealTime, meal]) => {
        pdf.setFont('helvetica', 'bold')
        pdf.text(mealTime + ':', 25, yPosition)
        pdf.setFont('helvetica', 'normal')
        
        // Quebrar texto longo
        const splitMeal = pdf.splitTextToSize(meal, 120)
        pdf.text(splitMeal, 70, yPosition)
        yPosition += splitMeal.length * 4
      })
      
      yPosition += 5
      
      // Verificar se precisa de nova página
      if (yPosition > pageHeight - 30) {
        pdf.addPage()
        yPosition = 20
      }
    })
    
    // Informações da Nutricionista
    if (yPosition > pageHeight - 50) {
      pdf.addPage()
      yPosition = 20
    }
    
    yPosition += 10
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Contato da Nutricionista', 20, yPosition)
    yPosition += 10
    
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    
    const nutritionistFields = [
      { label: 'Nome', value: nutritionistInfo.nome },
      { label: 'CRN', value: nutritionistInfo.crn },
      { label: 'Telefone', value: nutritionistInfo.telefone },
      { label: 'E-mail', value: nutritionistInfo.email },
      { label: 'Redes Sociais', value: nutritionistInfo.redesSociais }
    ]
    
    nutritionistFields.forEach(field => {
      if (field.value) {
        pdf.setFont('helvetica', 'bold')
        pdf.text(field.label + ':', 20, yPosition)
        pdf.setFont('helvetica', 'normal')
        pdf.text(field.value, 50, yPosition)
        yPosition += 8
      }
    })
    
    // Salvar o PDF
    pdf.save(`plano-alimentar-${clientData.nomeCompleto || 'cliente'}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-100 to-blue-100 py-12">
        <div className="absolute inset-0 opacity-20">
          <img src={headerDesign} alt="Header Design" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
            Plano Alimentar Personalizado
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto mb-6">
            Template profissional para consultoria de nutrição focada em mulheres
          </p>
          <Button 
            onClick={generatePDF}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Gerar PDF do Plano Alimentar
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="cliente" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="cliente" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Cliente
            </TabsTrigger>
            <TabsTrigger value="cardapio" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Cardápio
            </TabsTrigger>
            <TabsTrigger value="nutricao" className="flex items-center gap-2">
              <Apple className="w-4 h-4" />
              Nutrição
            </TabsTrigger>
            <TabsTrigger value="fases" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Fases da Vida
            </TabsTrigger>
            <TabsTrigger value="progresso" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Progresso
            </TabsTrigger>
            <TabsTrigger value="nutricionista" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Nutricionista
            </TabsTrigger>
          </TabsList>

          {/* Aba Informações do Cliente */}
          <TabsContent value="cliente">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações do Cliente
                </CardTitle>
                <CardDescription>
                  Preencha os dados básicos para personalizar o plano alimentar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomeCompleto">Nome Completo</Label>
                    <Input
                      id="nomeCompleto"
                      value={clientData.nomeCompleto}
                      onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                      placeholder="Digite o nome completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <Input
                      id="dataNascimento"
                      value={clientData.dataNascimento}
                      onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                      placeholder="DD/MM/AAAA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idade">Idade</Label>
                    <Input
                      id="idade"
                      type="number"
                      value={clientData.idade}
                      onChange={(e) => handleInputChange('idade', e.target.value)}
                      placeholder="Digite a idade"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profissao">Profissão</Label>
                    <Input
                      id="profissao"
                      value={clientData.profissao}
                      onChange={(e) => handleInputChange('profissao', e.target.value)}
                      placeholder="Digite a profissão"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altura">Altura (cm)</Label>
                    <Input
                      id="altura"
                      type="number"
                      value={clientData.altura}
                      onChange={(e) => handleInputChange('altura', e.target.value)}
                      placeholder="Ex: 165"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesoAtual">Peso Atual (kg)</Label>
                    <Input
                      id="pesoAtual"
                      type="number"
                      value={clientData.pesoAtual}
                      onChange={(e) => handleInputChange('pesoAtual', e.target.value)}
                      placeholder="Ex: 65"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objetivosNutricionais">Objetivos Nutricionais</Label>
                  <Textarea
                    id="objetivosNutricionais"
                    value={clientData.objetivosNutricionais}
                    onChange={(e) => handleInputChange('objetivosNutricionais', e.target.value)}
                    placeholder="Ex: Emagrecimento, ganho de massa muscular, melhora da saúde intestinal..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nivelAtividadeFisica">Nível de Atividade Física</Label>
                  <Select onValueChange={(value) => handleInputChange('nivelAtividadeFisica', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de atividade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentaria">Sedentária</SelectItem>
                      <SelectItem value="leve">Levemente ativa</SelectItem>
                      <SelectItem value="moderada">Moderadamente ativa</SelectItem>
                      <SelectItem value="intensa">Muito ativa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferenciasAlimentares">Preferências Alimentares</Label>
                  <Textarea
                    id="preferenciasAlimentares"
                    value={clientData.preferenciasAlimentares}
                    onChange={(e) => handleInputChange('preferenciasAlimentares', e.target.value)}
                    placeholder="Ex: Vegetariana, vegana, sem glúten, sem lactose..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alimentosNaoConsome">Alimentos que Não Gosta/Não Consome</Label>
                  <Textarea
                    id="alimentosNaoConsome"
                    value={clientData.alimentosNaoConsome}
                    onChange={(e) => handleInputChange('alimentosNaoConsome', e.target.value)}
                    placeholder="Liste alimentos específicos a serem evitados..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="historicoSaude">Histórico de Saúde Relevante</Label>
                  <Textarea
                    id="historicoSaude"
                    value={clientData.historicoSaude}
                    onChange={(e) => handleInputChange('historicoSaude', e.target.value)}
                    placeholder="Doenças preexistentes, alergias, intolerâncias, medicamentos..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rotinaDiaria">Rotina Diária</Label>
                  <Textarea
                    id="rotinaDiaria"
                    value={clientData.rotinaDiaria}
                    onChange={(e) => handleInputChange('rotinaDiaria', e.target.value)}
                    placeholder="Descreva horários de refeições, trabalho, sono, exercícios..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Cardápio */}
          <TabsContent value="cardapio">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Cardápio Semanal - Semana {currentWeek}
                </CardTitle>
                <CardDescription>
                  Plano alimentar estruturado para a semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {Object.entries(mealPlan[currentWeek]).map(([day, meals]) => (
                    <Card key={day} className="border-l-4 border-l-green-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{day}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {Object.entries(meals).map(([mealTime, meal]) => (
                          <div key={mealTime} className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Badge variant="outline" className="w-fit">
                              {mealTime}
                            </Badge>
                            <span className="text-sm text-gray-700">{meal}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Nutrição */}
          <TabsContent value="nutricao">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="w-5 h-5" />
                    Princípios Nutricionais
                  </CardTitle>
                  <CardDescription>
                    Diretrizes essenciais para uma alimentação equilibrada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nutritionalTips.map((tip, index) => (
                      <Card key={index} className="border-2 hover:border-green-300 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-100 rounded-full text-green-600">
                              {tip.icon}
                            </div>
                            <h3 className="font-semibold">{tip.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{tip.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Macronutrientes Essenciais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Proteínas</h3>
                      <p className="text-sm text-blue-600">
                        Essenciais para construção muscular e saciedade. 
                        Fontes: carnes magras, ovos, leguminosas.
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Carboidratos</h3>
                      <p className="text-sm text-green-600">
                        Principal fonte de energia. Priorize carboidratos complexos como grãos integrais.
                      </p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-800 mb-2">Gorduras Saudáveis</h3>
                      <p className="text-sm text-orange-600">
                        Cruciais para equilíbrio hormonal. Fontes: abacate, nozes, azeite.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Fases da Vida */}
          <TabsContent value="fases">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Nutrição por Fase da Vida
                </CardTitle>
                <CardDescription>
                  Necessidades nutricionais específicas para cada etapa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(phaseNutrition).map(([phase, info]) => (
                    <Card key={phase} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <CardTitle className="text-lg">{phase}</CardTitle>
                        <CardDescription className="text-blue-600 font-medium">
                          Foco: {info.focus}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{info.description}</p>
                        <div>
                          <h4 className="font-semibold mb-2">Nutrientes-chave:</h4>
                          <div className="flex flex-wrap gap-2">
                            {info.nutrients.map((nutrient, index) => (
                              <Badge key={index} variant="secondary">
                                {nutrient}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Progresso */}
          <TabsContent value="progresso">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Acompanhamento e Progresso
                </CardTitle>
                <CardDescription>
                  Registre observações e ajustes semanais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {progressNotes.map((note, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="text-lg">Semana {note.semana}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`desafios-${index}`}>Desafios Observados</Label>
                        <Textarea
                          id={`desafios-${index}`}
                          value={note.desafios}
                          onChange={(e) => handleProgressChange(index, 'desafios', e.target.value)}
                          placeholder="Descreva os principais desafios da semana..."
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`conquistas-${index}`}>Conquistas Alcançadas</Label>
                        <Textarea
                          id={`conquistas-${index}`}
                          value={note.conquistas}
                          onChange={(e) => handleProgressChange(index, 'conquistas', e.target.value)}
                          placeholder="Liste as conquistas e progressos..."
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`ajustes-${index}`}>Ajustes Necessários</Label>
                        <Textarea
                          id={`ajustes-${index}`}
                          value={note.ajustes}
                          onChange={(e) => handleProgressChange(index, 'ajustes', e.target.value)}
                          placeholder="Anote ajustes a serem discutidos com a nutricionista..."
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Nutricionista */}
          <TabsContent value="nutricionista">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações da Nutricionista
                </CardTitle>
                <CardDescription>
                  Dados de contato do profissional responsável
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nutri-nome">Nome Completo</Label>
                    <Input 
                      id="nutri-nome" 
                      value={nutritionistInfo.nome}
                      onChange={(e) => handleNutritionistChange('nome', e.target.value)}
                      placeholder="Nome da nutricionista" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nutri-crn">CRN</Label>
                    <Input 
                      id="nutri-crn" 
                      value={nutritionistInfo.crn}
                      onChange={(e) => handleNutritionistChange('crn', e.target.value)}
                      placeholder="Registro no CRN" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nutri-telefone">Telefone</Label>
                    <Input 
                      id="nutri-telefone" 
                      value={nutritionistInfo.telefone}
                      onChange={(e) => handleNutritionistChange('telefone', e.target.value)}
                      placeholder="Telefone de contato" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nutri-email">E-mail</Label>
                    <Input 
                      id="nutri-email" 
                      value={nutritionistInfo.email}
                      onChange={(e) => handleNutritionistChange('email', e.target.value)}
                      placeholder="E-mail profissional" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nutri-redes">Redes Sociais</Label>
                  <Input 
                    id="nutri-redes" 
                    value={nutritionistInfo.redesSociais}
                    onChange={(e) => handleNutritionistChange('redesSociais', e.target.value)}
                    placeholder="Instagram, Facebook, LinkedIn..." 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">Template de Plano Alimentar para Mulheres</p>
          <p className="text-green-200">
            Desenvolvido com as melhores práticas em nutrição feminina
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

